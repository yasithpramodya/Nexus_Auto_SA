import { useState } from 'react';
import { ChevronDownIcon } from './Icons.jsx';

const faqs = [
  {
    q: 'What is included in the Drive Away price in Adelaide?',
    a: 'Every advertised vehicle includes South Australian registration, statutory roadworthy certification (RWC), all Australian import duties and taxes paid, full Australian Design Rule (ADR) engineering compliance, and a comprehensive mechanical service plus interior detail. There are no surprise dealer delivery fees.',
  },
  {
    q: 'How do you verify the odometer and history of imported cars?',
    a: 'We only source vehicles through accredited Japanese auction houses (such as USS, CAA, and TAA). Every vehicle arrives with its genuine Japanese Export Certificate, official auction inspection sheet, and verified odometer history logged in the Ministry of Land, Infrastructure, Transport and Tourism (MLIT) database.',
  },
  {
    q: 'Can you source a specific car from Japanese auctions for me?',
    a: 'Yes, custom importing is one of our core specialties. Tell us the exact model, trim, color, transmission, and budget you require. We monitor Japan’s daily auction lanes (over 150,000 cars per week) and provide comprehensive translations, high-res photos, and bidding support with typical 6–10 week delivery to Adelaide.',
  },
  {
    q: 'Do you arrange delivery to Melbourne, Sydney, Brisbane, or Perth?',
    a: 'Yes. While our showroom is in Prospect, Adelaide, we regularly arrange fully insured enclosed or open freight transport to all Australian capital cities and regional centers at competitive dealer trade rates.',
  },
  {
    q: 'Do you offer mechanical warranties and trade-ins?',
    a: 'Yes, we partner with Australia’s leading vehicle warranty providers to offer 1 to 5-year nationwide comprehensive warranty packages with 24/7 roadside assistance. We also welcome trade-ins against any stock vehicle.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={faq.q} className={`faq-item${isOpen ? ' active' : ''}`}>
            <button
              className="faq-button"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
            >
              <span>{faq.q}</span>
              <span className="faq-icon-arrow" aria-hidden="true">
                <ChevronDownIcon size={15} />
              </span>
            </button>
            {isOpen && (
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
