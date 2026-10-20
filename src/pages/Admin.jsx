import { useState, useEffect } from 'react';
import { vehicles as defaultVehicles, formatKm, business } from '../data/vehicles.js';
import { db } from '../firebase.js';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  CarIcon,
  ShieldCheckIcon,
  SearchIcon,
  CheckIcon,
  CloseIcon,
  ArrowRightIcon,
  PhoneIcon,
  MailIcon,
  LockIcon,
  AwardIcon,
  CameraIcon,
} from '../components/Icons.jsx';

// Client-side image compressor to optimize uploaded car pictures before storing
const compressImageFile = (file, maxWidth = 1200, maxHeight = 900, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Failed to load image file'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
};


export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('inventory'); // inventory | requests | enquiries
  const [inventory, setInventory] = useState(defaultVehicles);
  const [requests, setRequests] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Editing vehicle modal & picture management state
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isNewVehicle, setIsNewVehicle] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [photoLabelInput, setPhotoLabelInput] = useState('');
  const [isProcessingPhotos, setIsProcessingPhotos] = useState(false);

  // Upload pictures from device (single cover or multiple gallery)
  const handleFileUpload = async (e, isPrimaryOnly = false) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !editingVehicle) return;
    setIsProcessingPhotos(true);
    try {
      const compressedList = [];
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        const dataUrl = await compressImageFile(file);
        const autoLabel = file.name ? file.name.replace(/\.[^/.]+$/, '').slice(0, 24) : 'Vehicle Photo';
        compressedList.push({ src: dataUrl, label: autoLabel });
      }

      if (compressedList.length > 0) {
        if (isPrimaryOnly) {
          const firstSrc = compressedList[0].src;
          const currentGallery = editingVehicle.gallery || [];
          const updatedGallery = currentGallery.length > 0
            ? [{ src: firstSrc, label: 'Cover Photo' }, ...currentGallery.filter((g) => g.src !== firstSrc)]
            : [{ src: firstSrc, label: 'Cover Photo' }];
          setEditingVehicle({
            ...editingVehicle,
            image: firstSrc,
            gallery: updatedGallery,
          });
        } else {
          const currentGallery = editingVehicle.gallery || [];
          const updatedGallery = [...currentGallery, ...compressedList];
          const primary = editingVehicle.image || compressedList[0]?.src;
          setEditingVehicle({
            ...editingVehicle,
            image: primary,
            gallery: updatedGallery,
          });
        }
      }
    } catch (err) {
      console.error('Image processing failed:', err);
      alert('Could not process this image. Please check file format.');
    } finally {
      setIsProcessingPhotos(false);
      e.target.value = '';
    }
  };

  // Add photo via direct URL
  const handleAddPhotoUrl = () => {
    if (!photoUrlInput.trim() || !editingVehicle) return;
    const url = photoUrlInput.trim();
    const label = photoLabelInput.trim() || 'Angle View';
    const currentGallery = editingVehicle.gallery || [];
    const updatedGallery = [...currentGallery, { src: url, label }];
    setEditingVehicle({
      ...editingVehicle,
      image: editingVehicle.image || url,
      gallery: updatedGallery,
    });
    setPhotoUrlInput('');
    setPhotoLabelInput('');
  };

  // Remove photo from gallery
  const handleRemovePhoto = (idxToRemove) => {
    if (!editingVehicle) return;
    const currentGallery = editingVehicle.gallery || [];
    const removedItem = currentGallery[idxToRemove];
    const updatedGallery = currentGallery.filter((_, i) => i !== idxToRemove);
    let newPrimary = editingVehicle.image;
    if (newPrimary === removedItem?.src) {
      newPrimary = updatedGallery[0]?.src || '';
    }
    setEditingVehicle({
      ...editingVehicle,
      image: newPrimary,
      gallery: updatedGallery,
    });
  };

  // Set selected photo as primary cover
  const handleSetCover = (src) => {
    if (!editingVehicle) return;
    setEditingVehicle({
      ...editingVehicle,
      image: src,
    });
  };

  // Pick a preset car image from default stock
  const handleSelectPresetCar = (e) => {
    const selected = defaultVehicles.find((v) => v.id === e.target.value);
    if (!selected || !editingVehicle) return;
    const presetGallery = selected.gallery && selected.gallery.length > 0
      ? selected.gallery
      : [{ src: selected.image, label: selected.title }];
    setEditingVehicle({
      ...editingVehicle,
      image: selected.image,
      gallery: presetGallery,
    });
  };

  // Authenticate admin
  const handleLogin = (e) => {
    e.preventDefault();
    // Default admin passkey or custom environment passkey
    if (passcode.trim() === 'nexus2026' || passcode.trim() === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid administrator passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  // Fetch data from Firestore
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch custom vehicles if any in Firestore
        try {
          const vehSnap = await getDocs(collection(db, 'vehicles'));
          if (!vehSnap.empty) {
            const fetched = vehSnap.docs.map((d) => ({ id: d.id, ...d.data(), _firestoreDoc: true }));
            setInventory([...fetched, ...defaultVehicles.filter(v => !fetched.some(f => f.id === v.id))]);
          }
        } catch (vehErr) {
          console.warn('Vehicles fetch error, using base inventory:', vehErr);
        }

        // Fetch preferred requests
        try {
          const reqSnap = await getDocs(collection(db, 'preferred_requests'));
          const fetchedReqs = reqSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
          // Merge with any local storage fallback
          const localReqs = JSON.parse(localStorage.getItem('preferred_requests') || '[]');
          setRequests([...fetchedReqs, ...localReqs.filter(l => !fetchedReqs.some(f => f.id === l.id))]);
        } catch (reqErr) {
          const localReqs = JSON.parse(localStorage.getItem('preferred_requests') || '[]');
          setRequests(localReqs);
        }

        // Fetch enquiries
        try {
          const enqSnap = await getDocs(collection(db, 'enquiries'));
          const fetchedEnqs = enqSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
          const localEnqs = JSON.parse(localStorage.getItem('customer_enquiries') || '[]');
          setEnquiries([...fetchedEnqs, ...localEnqs.filter(l => !fetchedEnqs.some(f => f.id === l.id))]);
        } catch (enqErr) {
          const localEnqs = JSON.parse(localStorage.getItem('customer_enquiries') || '[]');
          setEnquiries(localEnqs);
        }
      } catch (err) {
        console.warn('Admin load error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [isAuthenticated]);

  // Handle vehicle save/update
  const handleSaveVehicle = async (e) => {
    e.preventDefault();
    if (!editingVehicle.title || !editingVehicle.price) {
      alert('Title and Price are required.');
      return;
    }

    try {
      const gallery = (editingVehicle.gallery && editingVehicle.gallery.length > 0)
        ? editingVehicle.gallery
        : (editingVehicle.image ? [{ src: editingVehicle.image, label: 'Exterior Profile' }] : []);
      const primaryImage = editingVehicle.image || gallery[0]?.src || defaultVehicles[0]?.image || '';

      const payload = {
        ...editingVehicle,
        image: primaryImage,
        gallery: gallery,
        price: Number(editingVehicle.price) || 0,
        odometerKm: Number(editingVehicle.odometerKm) || 0,
        year: Number(editingVehicle.year) || new Date().getFullYear(),
        priceDisplay: editingVehicle.priceDisplay || (editingVehicle.price ? `$${Number(editingVehicle.price).toLocaleString('en-AU')} AUD` : 'Price on Request'),
        updatedAt: serverTimestamp(),
      };

      if (isNewVehicle) {
        const docRef = await addDoc(collection(db, 'vehicles'), payload);
        const newEntry = { ...payload, id: docRef.id, _firestoreDoc: true };
        setInventory([newEntry, ...inventory]);
        setFeedbackMsg(`Successfully listed "${payload.title}"`);
      } else {
        if (editingVehicle._firestoreDoc) {
          await updateDoc(doc(db, 'vehicles', editingVehicle.id), payload);
        }
        setInventory(inventory.map((v) => (v.id === editingVehicle.id ? payload : v)));
        setFeedbackMsg(`Updated "${payload.title}" successfully.`);
      }

      setEditingVehicle(null);
      setTimeout(() => setFeedbackMsg(''), 4000);
    } catch (err) {
      console.error('Error saving vehicle:', err);
      alert('Failed to save listing to database. Changes applied locally in session.');
      if (isNewVehicle) {
        setInventory([editingVehicle, ...inventory]);
      } else {
        setInventory(inventory.map((v) => (v.id === editingVehicle.id ? editingVehicle : v)));
      }
      setEditingVehicle(null);
    }
  };

  // Delete vehicle
  const handleDeleteVehicle = async (id, isFirestore) => {
    if (!window.confirm('Are you sure you want to remove this vehicle listing?')) return;
    try {
      if (isFirestore) {
        await deleteDoc(doc(db, 'vehicles', id));
      }
      setInventory(inventory.filter((v) => v.id !== id));
      setFeedbackMsg('Vehicle listing removed.');
      setTimeout(() => setFeedbackMsg(''), 3000);
    } catch (err) {
      console.warn('Delete error:', err);
      setInventory(inventory.filter((v) => v.id !== id));
    }
  };

  // Toggle vehicle availability
  const handleToggleAvailability = (veh) => {
    const nextStatus = veh.availability === 'In Stock' ? 'Arriving Soon' : veh.availability === 'Arriving Soon' ? 'Sold / Reserved' : 'In Stock';
    const updated = { ...veh, availability: nextStatus, status: nextStatus };
    setInventory(inventory.map((v) => (v.id === veh.id ? updated : v)));
    setFeedbackMsg(`Status for ${veh.title} updated to "${nextStatus}".`);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <section className="section" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ maxWidth: 440, margin: 'auto' }}>
          <div className="glass-card" style={{ padding: '40px 32px', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                padding: 16,
                borderRadius: '50%',
                background: 'rgba(232,25,44,0.1)',
                color: 'var(--red)',
                marginBottom: 16,
              }}
            >
              <LockIcon size={32} />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
              Dealer Administration
            </h1>
            <p style={{ color: 'var(--ink-2)', fontSize: '0.9rem', marginBottom: 24, lineHeight: 1.5 }}>
              Enter your authorized management passcode to access stock management and enquiries.
            </p>

            {authError && (
              <div
                style={{
                  background: 'rgba(232,25,44,0.12)',
                  border: '1px solid rgba(232,25,44,0.3)',
                  color: '#ff6b7a',
                  padding: '10px 14px',
                  borderRadius: 'var(--r-sm)',
                  fontSize: '0.85rem',
                  marginBottom: 18,
                }}
              >
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="field" style={{ marginBottom: 20 }}>
                <input
                  type="password"
                  placeholder="Enter Passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  style={{ textAlign: 'center', fontSize: '1.1rem', letterSpacing: '0.1em' }}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Unlock Dashboard
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 24 }}>
        <div className="wrap page-hero-inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p className="eyebrow red">Dealer Portal</p>
              <h1>Inventory &amp; Operations Management</h1>
              <p className="page-hero-sub" style={{ marginTop: 6, fontSize: '0.92rem' }}>
                Manage vehicle listings, update availability, and review customer requests and enquiries.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={handleLogout}
            >
              Lock &amp; Exit Portal
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          {/* Feedback banner */}
          {feedbackMsg && (
            <div
              style={{
                background: 'rgba(52,211,153,0.12)',
                border: '1px solid rgba(52,211,153,0.3)',
                color: 'var(--green)',
                padding: '12px 18px',
                borderRadius: 'var(--r-sm)',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <CheckIcon size={16} />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: 10, borderBottom: '1px solid var(--border)', paddingBottom: 14, marginBottom: 24, flexWrap: 'wrap' }}>
            <button
              className={`filter-tab-btn${activeTab === 'inventory' ? ' active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              Vehicle Inventory ({inventory.length})
            </button>
            <button
              className={`filter-tab-btn${activeTab === 'requests' ? ' active' : ''}`}
              onClick={() => setActiveTab('requests')}
            >
              Preferred Car Requests ({requests.length})
            </button>
            <button
              className={`filter-tab-btn${activeTab === 'enquiries' ? ' active' : ''}`}
              onClick={() => setActiveTab('enquiries')}
            >
              Contact Enquiries ({enquiries.length})
            </button>
          </div>

          {/* ── TAB 1: INVENTORY MANAGEMENT ─────────────────── */}
          {activeTab === 'inventory' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)' }}>
                  All Vehicle Listings ({inventory.length})
                </h2>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setIsNewVehicle(true);
                    setEditingVehicle({
                      id: `veh-${Date.now()}`,
                      title: '',
                      make: '',
                      model: '',
                      year: 2022,
                      price: 35000,
                      priceDisplay: '$35,000 AUD',
                      priceNote: 'Direct Japanese Import',
                      odometerKm: 45000,
                      transmission: 'Automatic',
                      fuelType: 'Petrol',
                      bodyType: 'Sedan',
                      engine: '2.0L 4-Cylinder',
                      drive: 'Front-Wheel Drive',
                      location: 'Australia',
                      availability: 'In Stock',
                      condition: 'Quality Used Import',
                      category: 'Comfortable Sedans',
                      image: defaultVehicles[0]?.image || '',
                      gallery: defaultVehicles[0]?.image ? [{ src: defaultVehicles[0].image, label: 'Exterior Profile' }] : [],
                      description: 'Quality Japanese used vehicle with verified mileage and clean inspection report.',
                      features: ['Air Conditioning', 'Power Windows', 'Reverse Camera', 'Smart Key'],
                    });
                  }}
                >
                  + Add New Vehicle
                </button>
              </div>

              <div style={{ overflowX: 'auto', background: 'var(--card)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13.5 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase' }}>
                      <th style={{ padding: '14px 16px' }}>Vehicle</th>
                      <th style={{ padding: '14px 16px' }}>Price</th>
                      <th style={{ padding: '14px 16px' }}>Year / Odo</th>
                      <th style={{ padding: '14px 16px' }}>Specs</th>
                      <th style={{ padding: '14px 16px' }}>Location</th>
                      <th style={{ padding: '14px 16px' }}>Availability</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((v) => (
                      <tr key={v.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                          <img
                            src={v.image}
                            alt=""
                            style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 'var(--r-xs)', background: 'var(--bg-1)' }}
                          />
                          <div>
                            <strong style={{ color: 'var(--ink)', display: 'block' }}>{v.title}</strong>
                            <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{v.make} {v.model}</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--mono)' }}>
                          {v.priceDisplay || (v.price ? `$${Number(v.price).toLocaleString()} AUD` : 'Price on Request')}
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--ink-2)' }}>
                          {v.year} · {formatKm(v.odometerKm)}
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--ink-2)' }}>
                          {v.transmission?.split(' ')[0]} · {v.fuelType} · {v.bodyType}
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--gold)', fontSize: 12 }}>
                          {v.location}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <button
                            type="button"
                            className="badge badge-green"
                            style={{ cursor: 'pointer', border: 'none' }}
                            onClick={() => handleToggleAvailability(v)}
                            title="Click to toggle status"
                          >
                            {v.availability || v.status}
                          </button>
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: 8 }}>
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm"
                              onClick={() => {
                                setIsNewVehicle(false);
                                const initialGallery = (v.gallery && v.gallery.length > 0)
                                  ? v.gallery
                                  : (v.image ? [{ src: v.image, label: 'Exterior Profile' }] : []);
                                setEditingVehicle({
                                  ...v,
                                  image: v.image || initialGallery[0]?.src || '',
                                  gallery: initialGallery,
                                });
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline btn-sm"
                              style={{ color: '#ff6b7a', borderColor: 'rgba(232,25,44,0.3)' }}
                              onClick={() => handleDeleteVehicle(v.id, v._firestoreDoc)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── TAB 2: PREFERRED CAR REQUESTS ──────────────── */}
          {activeTab === 'requests' && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>
                Customer Preferred Vehicle Requests ({requests.length})
              </h2>

              {requests.length === 0 ? (
                <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                  <p style={{ color: 'var(--ink-3)' }}>No preferred car requests submitted yet.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 16 }}>
                  {requests.map((r, i) => (
                    <div key={r.id || i} className="glass-card" style={{ padding: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                        <div>
                          <strong style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>{r.fullName}</strong>
                          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
                            {r.email} · {r.phoneNumber} · Location: <span style={{ color: 'var(--gold)' }}>{r.location}</span>
                          </div>
                        </div>
                        <span className="badge badge-gold">
                          Status: {r.status || 'New'}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, background: 'var(--bg-1)', padding: 14, borderRadius: 'var(--r-sm)', margin: '12px 0' }}>
                        <div>
                          <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', display: 'block' }}>PREFERRED MAKE / MODEL</span>
                          <strong style={{ fontSize: 13, color: 'var(--ink)' }}>{r.preferredMake} {r.preferredModel}</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', display: 'block' }}>YEAR RANGE</span>
                          <strong style={{ fontSize: 13, color: 'var(--ink)' }}>{r.yearRange}</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', display: 'block' }}>BUDGET</span>
                          <strong style={{ fontSize: 13, color: 'var(--ink)' }}>{r.budget}</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', display: 'block' }}>BODY / TRANS / FUEL</span>
                          <strong style={{ fontSize: 13, color: 'var(--ink)' }}>{r.bodyType} · {r.transmission} · {r.fuelType}</strong>
                        </div>
                      </div>

                      {r.additionalRequirements && (
                        <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', marginTop: 8 }}>
                          <strong>Notes:</strong> {r.additionalRequirements}
                        </p>
                      )}

                      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                        <a href={`mailto:${r.email}?subject=Your Vehicle Request with Nexus Auto SA`} className="btn btn-primary btn-sm">
                          Reply via Email
                        </a>
                        <a href={`tel:${r.phoneNumber?.replace(/\s/g, '')}`} className="btn btn-ghost btn-sm">
                          Call Client
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TAB 3: CONTACT ENQUIRIES ───────────────────── */}
          {activeTab === 'enquiries' && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>
                Customer Enquiries ({enquiries.length})
              </h2>

              {enquiries.length === 0 ? (
                <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                  <p style={{ color: 'var(--ink-3)' }}>No direct contact enquiries submitted yet.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 16 }}>
                  {enquiries.map((enq, idx) => (
                    <div key={enq.id || idx} className="glass-card" style={{ padding: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                        <div>
                          <strong style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>{enq.name}</strong>
                          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
                            {enq.email} · {enq.phone}
                          </div>
                        </div>
                        <span className="badge badge-green">{enq.enquiryType || 'General'}</span>
                      </div>

                      {enq.vehicleReference && (
                        <div style={{ background: 'rgba(232,25,44,0.1)', padding: '6px 12px', borderRadius: 'var(--r-xs)', color: 'var(--red)', fontSize: 12, marginBottom: 10, display: 'inline-block' }}>
                          Regarding Vehicle: <strong>{enq.vehicleReference}</strong>
                        </div>
                      )}

                      <div style={{ marginBottom: 8 }}>
                        <strong style={{ fontSize: '0.94rem', color: 'var(--ink)' }}>Subject: {enq.subject}</strong>
                      </div>
                      <p style={{ color: 'var(--ink-2)', fontSize: '0.9rem', lineHeight: 1.6, background: 'var(--bg-1)', padding: 12, borderRadius: 'var(--r-sm)' }}>
                        {enq.message}
                      </p>

                      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                        <a href={`mailto:${enq.email}?subject=Re: ${encodeURIComponent(enq.subject || 'Your Enquiry')}`} className="btn btn-primary btn-sm">
                          Reply via Email
                        </a>
                        <a href={`tel:${enq.phone?.replace(/\s/g, '')}`} className="btn btn-ghost btn-sm">
                          Call Customer
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* ── EDIT / CREATE VEHICLE MODAL ───────────────────── */}
      {editingVehicle && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            backdropFilter: 'blur(8px)',
          }}
          onClick={() => setEditingVehicle(null)}
        >
          <div
            style={{
              background: 'var(--card)',
              maxWidth: 720,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--border-2)',
              padding: 28,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)' }}>
                {isNewVehicle ? 'Add New Vehicle Listing' : `Edit Listing: ${editingVehicle.title}`}
              </h2>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setEditingVehicle(null)}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveVehicle}>
              <div className="form-row">
                <div className="field">
                  <label>Title *</label>
                  <input
                    type="text"
                    required
                    value={editingVehicle.title}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, title: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Price (AUD) *</label>
                  <input
                    type="number"
                    required
                    value={editingVehicle.price}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Make</label>
                  <input
                    type="text"
                    value={editingVehicle.make}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, make: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Model</label>
                  <input
                    type="text"
                    value={editingVehicle.model}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, model: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Year</label>
                  <input
                    type="number"
                    value={editingVehicle.year}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, year: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Odometer (km)</label>
                  <input
                    type="number"
                    value={editingVehicle.odometerKm}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, odometerKm: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Transmission</label>
                  <input
                    type="text"
                    value={editingVehicle.transmission}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, transmission: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Fuel Type</label>
                  <select
                    value={editingVehicle.fuelType}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, fuelType: e.target.value })}
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric (EV)">Electric (EV)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Body Type</label>
                  <select
                    value={editingVehicle.bodyType}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, bodyType: e.target.value })}
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>
                <div className="field">
                  <label>Location</label>
                  <select
                    value={editingVehicle.location}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, location: e.target.value })}
                  >
                    <option value="Australia">Australia</option>
                    <option value="Australia & Sri Lanka Import Eligible">Australia &amp; Sri Lanka Import Eligible</option>
                    <option value="Japan Auction Transit">Japan Auction Transit</option>
                  </select>
                </div>
                <div className="field">
                  <label>Availability Status</label>
                  <select
                    value={editingVehicle.availability}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, availability: e.target.value, status: e.target.value })}
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Just Arrived">Just Arrived</option>
                    <option value="Arriving Soon">Arriving Soon</option>
                    <option value="Reserved / Transit">Reserved / Transit</option>
                  </select>
                </div>
              </div>

              {/* ── VEHICLE PICTURES & GALLERY SECTION ── */}
              <div
                style={{
                  marginTop: 22,
                  marginBottom: 20,
                  padding: 20,
                  borderRadius: 'var(--r-md)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-2)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: 'var(--red)', display: 'flex' }}>
                        <CameraIcon size={20} />
                      </span>
                      <strong style={{ fontSize: '1rem', color: 'var(--ink)' }}>Vehicle Pictures &amp; Gallery</strong>
                      <span className="badge badge-gold" style={{ fontSize: 11 }}>
                        {(editingVehicle.gallery?.length || (editingVehicle.image ? 1 : 0))} photos
                      </span>
                    </div>
                    <p style={{ color: 'var(--ink-3)', fontSize: '0.82rem', marginTop: 4 }}>
                      Add car photos via device upload, web image URL, or choose a preset Japanese model.
                    </p>
                  </div>

                  {/* Preset Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ fontSize: 12, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>Preset Image:</label>
                    <select
                      style={{ fontSize: 12, padding: '6px 10px', background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--r-xs)', color: 'var(--ink)' }}
                      onChange={handleSelectPresetCar}
                      defaultValue=""
                    >
                      <option value="" disabled>Choose Sample Car...</option>
                      {defaultVehicles.map((dv) => (
                        <option key={dv.id} value={dv.id}>{dv.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Primary Cover Photo Preview & Quick Replace */}
                <div
                  style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    background: 'var(--bg-1)',
                    padding: 14,
                    borderRadius: 'var(--r-sm)',
                    border: '1px solid var(--border)',
                    marginBottom: 16,
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      width: 140,
                      height: 95,
                      borderRadius: 'var(--r-xs)',
                      overflow: 'hidden',
                      background: 'rgba(0,0,0,0.5)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-2)',
                      position: 'relative',
                    }}
                  >
                    {editingVehicle.image ? (
                      <img
                        src={editingVehicle.image}
                        alt="Primary Cover"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ textAlign: 'center', color: 'var(--ink-3)', fontSize: 11, padding: 8 }}>
                        <CameraIcon size={24} />
                        <div>No Cover</div>
                      </div>
                    )}
                    <span
                      style={{
                        position: 'absolute',
                        top: 4,
                        left: 4,
                        background: 'rgba(0,0,0,0.8)',
                        color: 'var(--gold)',
                        padding: '2px 6px',
                        borderRadius: 4,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}
                    >
                      Cover
                    </span>
                  </div>

                  <div style={{ flex: 1, minWidth: 240 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 6 }}>
                      Primary Cover Image URL
                    </label>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <input
                        type="url"
                        placeholder="https://images.example.com/car.jpg or choose file below"
                        value={editingVehicle.image || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const currentG = editingVehicle.gallery || [];
                          const updatedG = currentG.some((g) => g.src === val)
                            ? currentG
                            : val ? [{ src: val, label: 'Cover Photo' }, ...currentG] : currentG;
                          setEditingVehicle({ ...editingVehicle, image: val, gallery: updatedG });
                        }}
                        style={{ fontSize: 12.5 }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                      <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', margin: 0, fontSize: 12 }}>
                        Upload Cover Photo
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileUpload(e, true)}
                          disabled={isProcessingPhotos}
                        />
                      </label>
                      <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>
                        Accepts JPG, PNG, WebP (auto-optimized)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upload Multiple Photos / Add by URL */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                    <strong style={{ fontSize: 13, color: 'var(--ink)' }}>Gallery Photos &amp; Angle Shots</strong>
                    <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer', margin: 0, fontSize: 12 }}>
                      {isProcessingPhotos ? 'Processing...' : '+ Upload Multiple Photos'}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, false)}
                        disabled={isProcessingPhotos}
                      />
                    </label>
                  </div>

                  {/* Add via URL row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px auto', gap: 8, marginBottom: 14 }}>
                    <input
                      type="url"
                      placeholder="Add photo by URL (e.g. https://...)"
                      value={photoUrlInput}
                      onChange={(e) => setPhotoUrlInput(e.target.value)}
                      style={{ fontSize: 12 }}
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Interior)"
                      value={photoLabelInput}
                      onChange={(e) => setPhotoLabelInput(e.target.value)}
                      style={{ fontSize: 12 }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={handleAddPhotoUrl}
                      disabled={!photoUrlInput.trim()}
                      style={{ fontSize: 12, padding: '0 14px' }}
                    >
                      Add URL
                    </button>
                  </div>

                  {/* Gallery Thumbnails List */}
                  {editingVehicle.gallery && editingVehicle.gallery.length > 0 ? (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                        gap: 12,
                        marginTop: 10,
                      }}
                    >
                      {editingVehicle.gallery.map((photo, idx) => {
                        const isCover = photo.src === editingVehicle.image;
                        return (
                          <div
                            key={idx}
                            style={{
                              position: 'relative',
                              borderRadius: 'var(--r-xs)',
                              overflow: 'hidden',
                              border: isCover ? '2px solid var(--gold)' : '1px solid var(--border)',
                              background: 'var(--bg-1)',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            <div style={{ height: 80, overflow: 'hidden', background: '#000', position: 'relative' }}>
                              <img
                                src={photo.src}
                                alt={photo.label || `Photo ${idx + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(idx)}
                                title="Remove photo"
                                style={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  background: 'rgba(0,0,0,0.7)',
                                  border: 'none',
                                  color: '#ff6b7a',
                                  borderRadius: '50%',
                                  width: 22,
                                  height: 22,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  padding: 0,
                                }}
                              >
                                <CloseIcon size={12} />
                              </button>

                              {isCover && (
                                <span
                                  style={{
                                    position: 'absolute',
                                    bottom: 4,
                                    left: 4,
                                    background: 'var(--gold)',
                                    color: '#000',
                                    fontSize: 9,
                                    fontWeight: 800,
                                    padding: '1px 5px',
                                    borderRadius: 3,
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  Cover
                                </span>
                              )}
                            </div>

                            <div style={{ padding: '6px 8px', background: 'var(--card)', fontSize: 11 }}>
                              <input
                                type="text"
                                value={photo.label || ''}
                                placeholder="Photo label..."
                                onChange={(e) => {
                                  const updated = [...editingVehicle.gallery];
                                  updated[idx] = { ...updated[idx], label: e.target.value };
                                  setEditingVehicle({ ...editingVehicle, gallery: updated });
                                }}
                                style={{
                                  fontSize: 11,
                                  padding: '2px 4px',
                                  height: 'auto',
                                  border: '1px solid var(--border-2)',
                                  borderRadius: 3,
                                  marginBottom: 4,
                                }}
                              />
                              {!isCover && (
                                <button
                                  type="button"
                                  onClick={() => handleSetCover(photo.src)}
                                  style={{
                                    width: '100%',
                                    fontSize: 10,
                                    padding: '3px 0',
                                    background: 'rgba(212,168,83,0.1)',
                                    border: '1px solid rgba(212,168,83,0.3)',
                                    color: 'var(--gold)',
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                  }}
                                >
                                  Make Cover
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: 16,
                        textAlign: 'center',
                        color: 'var(--ink-3)',
                        fontSize: 12,
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: 'var(--r-xs)',
                        marginTop: 8,
                      }}
                    >
                      No additional gallery photos added yet. Upload files or paste URLs above.
                    </div>
                  )}
                </div>
              </div>

              <div className="field" style={{ marginTop: 12 }}>
                <label>Description</label>
                <textarea
                  rows="3"
                  value={editingVehicle.description}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setEditingVehicle(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Vehicle Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
