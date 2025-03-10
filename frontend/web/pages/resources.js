import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useState } from 'react';

export default function Resources() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('education');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout title="Resources | ABDOS Skin Cancer Detection">
      <section className="resources-hero">
        <div className="container">
          <h1 className="resources-title">Resources</h1>
          <p className="resources-subtitle">
            Educational information and resources about skin cancer and dermatological conditions
          </p>
        </div>
      </section>

      <section className="resources-content">
        <div className="container">
          <div className="resources-tabs">
            <button 
              className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => handleTabClick('education')}
            >
              Education
            </button>
            <button 
              className={`tab-button ${activeTab === 'prevention' ? 'active' : ''}`}
              onClick={() => handleTabClick('prevention')}
            >
              Prevention
            </button>
            <button 
              className={`tab-button ${activeTab === 'types' ? 'active' : ''}`}
              onClick={() => handleTabClick('types')}
            >
              Types of Skin Cancer
            </button>
            <button 
              className={`tab-button ${activeTab === 'links' ? 'active' : ''}`}
              onClick={() => handleTabClick('links')}
            >
              External Resources
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'education' && (
              <div className="education-content">
                <h2>Understanding Skin Cancer</h2>
                <p>
                  Skin cancer is the abnormal growth of skin cells, most often triggered by exposure to ultraviolet (UV) 
                  radiation from the sun or tanning beds. It's the most common form of cancer globally, with millions 
                  of cases diagnosed each year.
                </p>

                <div className="info-card">
                  <h3>Key Facts About Skin Cancer</h3>
                  <ul>
                    <li>Skin cancer is the most common cancer in the United States and worldwide</li>
                    <li>One in five Americans will develop skin cancer by the age of 70</li>
                    <li>Early detection has been linked to a 98% five-year survival rate for melanoma</li>
                    <li>Regular skin checks can help identify concerning changes that require medical attention</li>
                    <li>Many skin cancers are preventable with proper sun protection and avoiding tanning beds</li>
                  </ul>
                </div>

                <h3>The ABCDE Rule for Skin Checks</h3>
                <p>
                  When examining moles or skin lesions, healthcare professionals often refer to the ABCDE rule to identify 
                  potential warning signs of melanoma:
                </p>

                <div className="abcde-grid">
                  <div className="abcde-item">
                    <div className="letter">A</div>
                    <div className="content">
                      <h4>Asymmetry</h4>
                      <p>One half of the mole does not match the other half.</p>
                    </div>
                  </div>
                  <div className="abcde-item">
                    <div className="letter">B</div>
                    <div className="content">
                      <h4>Border</h4>
                      <p>The edges are irregular, ragged, notched, or blurred.</p>
                    </div>
                  </div>
                  <div className="abcde-item">
                    <div className="letter">C</div>
                    <div className="content">
                      <h4>Color</h4>
                      <p>The color is not uniform and may include shades of brown, black, or tan, as well as areas of red, white, or blue.</p>
                    </div>
                  </div>
                  <div className="abcde-item">
                    <div className="letter">D</div>
                    <div className="content">
                      <h4>Diameter</h4>
                      <p>Melanomas are usually greater than 6mm (the size of a pencil eraser) when diagnosed, but they can be smaller.</p>
                    </div>
                  </div>
                  <div className="abcde-item">
                    <div className="letter">E</div>
                    <div className="content">
                      <h4>Evolving</h4>
                      <p>The mole is changing in size, shape, color, or elevation, or it's developing new symptoms like bleeding, itching, or crusting.</p>
                    </div>
                  </div>
                </div>

                <div className="video-container">
                  <h3>Educational Video</h3>
                  <div className="video-embed">
                    <iframe 
                      width="100%" 
                      height="315" 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      title="Educational video about skin cancer" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="video-caption">Understanding the basics of skin cancer and how to perform self-examinations.</p>
                </div>
              </div>
            )}

            {activeTab === 'prevention' && (
              <div className="prevention-content">
                <h2>Prevention Tips</h2>
                <p>
                  Most skin cancers are preventable. Taking the proper precautions against sun exposure is key to reducing your risk.
                </p>

                <div className="prevention-grid">
                  <div className="prevention-item">
                    <div className="prevention-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3>Avoid Peak Sun Hours</h3>
                    <p>Limit your exposure to direct sunlight during the peak hours of 10 a.m. to 4 p.m. when UV rays are strongest.</p>
                  </div>

                  <div className="prevention-item">
                    <div className="prevention-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <h3>Seek Shade</h3>
                    <p>Use umbrellas, trees, or other shade structures when outdoors, especially during midday hours.</p>
                  </div>

                  <div className="prevention-item">
                    <div className="prevention-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3>Use Sunscreen</h3>
                    <p>Apply a broad-spectrum sunscreen with SPF 30 or higher daily, even on cloudy days. Reapply every two hours and after swimming or sweating.</p>
                  </div>

                  <div className="prevention-item">
                    <div className="prevention-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3>Wear Protective Clothing</h3>
                    <p>Cover up with lightweight, long-sleeved shirts, long pants, wide-brimmed hats, and UV-blocking sunglasses.</p>
                  </div>

                  <div className="prevention-item">
                    <div className="prevention-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3>Avoid Tanning Beds</h3>
                    <p>Tanning beds emit harmful UV radiation that increases your risk of developing skin cancer and premature skin aging.</p>
                  </div>

                  <div className="prevention-item">
                    <div className="prevention-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3>Regular Skin Checks</h3>
                    <p>Perform monthly self-examinations to look for new or changing spots, and see a dermatologist annually for a professional skin exam.</p>
                  </div>
                </div>

                <div className="sunscreen-guide">
                  <h3>Choosing the Right Sunscreen</h3>
                  <p>Not all sunscreens are created equal. Here's what to look for:</p>
                  <ul>
                    <li><strong>Broad spectrum:</strong> Protects against both UVA and UVB rays</li>
                    <li><strong>SPF 30 or higher:</strong> Blocks 97% or more of UVB rays</li>
                    <li><strong>Water-resistant:</strong> Stays effective for 40-80 minutes in water</li>
                    <li><strong>Application amount:</strong> Use about 1 oz (a shot glass full) to cover the entire body</li>
                    <li><strong>Reapplication:</strong> Every 2 hours or after swimming/sweating</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'types' && (
              <div className="types-content">
                <h2>Types of Skin Cancer</h2>
                <p>
                  There are several types of skin cancer, each named after the type of skin cell from which they arise. 
                  The three most common types are basal cell carcinoma, squamous cell carcinoma, and melanoma.
                </p>

                <div className="cancer-types">
                  <div className="cancer-type">
                    <div className="type-image" style={{ backgroundImage: `url('/images/resources/bcc.jpg')` }}></div>
                    <div className="type-content">
                      <h3>Basal Cell Carcinoma (BCC)</h3>
                      <p>
                        The most common type of skin cancer, basal cell carcinoma begins in the basal cells — a type of cell 
                        within the skin that produces new skin cells as old ones die off.
                      </p>
                      <h4>Key Characteristics:</h4>
                      <ul>
                        <li>Appears as a flesh-colored, pearl-like bump or a pinkish patch of skin</li>
                        <li>Often develops on sun-exposed areas (face, head, neck)</li>
                        <li>Rarely spreads to other parts of the body but can be locally destructive</li>
                        <li>Highly treatable when detected early</li>
                      </ul>
                    </div>
                  </div>

                  <div className="cancer-type">
                    <div className="type-image" style={{ backgroundImage: `url('/images/resources/scc.jpg')` }}></div>
                    <div className="type-content">
                      <h3>Squamous Cell Carcinoma (SCC)</h3>
                      <p>
                        The second most common form of skin cancer, squamous cell carcinoma develops in the squamous cells 
                        that make up the middle and outer layers of the skin.
                      </p>
                      <h4>Key Characteristics:</h4>
                      <ul>
                        <li>Appears as a firm red nodule or a flat lesion with a scaly, crusted surface</li>
                        <li>Often found on sun-exposed areas (face, ears, neck, hands)</li>
                        <li>More likely than BCC to spread to other parts of the body if not treated early</li>
                        <li>Generally highly treatable when caught early</li>
                      </ul>
                    </div>
                  </div>

                  <div className="cancer-type">
                    <div className="type-image" style={{ backgroundImage: `url('/images/resources/melanoma.jpg')` }}></div>
                    <div className="type-content">
                      <h3>Melanoma</h3>
                      <p>
                        Though less common than basal cell and squamous cell carcinomas, melanoma is more dangerous because 
                        it's much more likely to spread to other parts of the body if not caught early.
                      </p>
                      <h4>Key Characteristics:</h4>
                      <ul>
                        <li>Often develops in an existing mole or appears as a new dark spot</li>
                        <li>Can occur anywhere on the body, including areas not exposed to the sun</li>
                        <li>More likely to metastasize (spread) than other skin cancers</li>
                        <li>Early detection is crucial for successful treatment</li>
                        <li>Follow the ABCDE rule for identifying suspicious moles</li>
                      </ul>
                    </div>
                  </div>

                  <div className="cancer-type">
                    <div className="type-image" style={{ backgroundImage: `url('/images/resources/rare.jpg')` }}></div>
                    <div className="type-content">
                      <h3>Rare Skin Cancers</h3>
                      <p>
                        Several other less common types of skin cancer exist, including Merkel cell carcinoma, dermatofibrosarcoma 
                        protuberans, sebaceous carcinoma, and cutaneous lymphoma.
                      </p>
                      <h4>Key Characteristics:</h4>
                      <ul>
                        <li>Merkel cell carcinoma is a rare, aggressive skin cancer often appearing as a flesh-colored or bluish-red nodule</li>
                        <li>Dermatofibrosarcoma protuberans begins as a hard, raised, reddish-brown patch that grows slowly</li>
                        <li>Sebaceous carcinoma appears as a painless, firm, yellowish lump, often on the eyelid</li>
                        <li>Cutaneous lymphomas are rare cancers that begin in lymphocytes and affect the skin</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'links' && (
              <div className="links-content">
                <h2>External Resources</h2>
                <p>
                  These trusted organizations provide additional information, support, and resources for skin cancer awareness, 
                  prevention, and treatment.
                </p>

                <div className="resources-grid">
                  <a href="https://www.cancer.org/cancer/skin-cancer.html" target="_blank" rel="noopener noreferrer" className="resource-link">
                    <div className="resource-card">
                      <h3>American Cancer Society</h3>
                      <p>Comprehensive information about skin cancer types, prevention, treatment, and resources for patients.</p>
                      <div className="resource-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </a>

                  <a href="https://www.skincancer.org/" target="_blank" rel="noopener noreferrer" className="resource-link">
                    <div className="resource-card">
                      <h3>Skin Cancer Foundation</h3>
                      <p>Education, prevention, and early detection resources, including a comprehensive self-examination guide.</p>
                      <div className="resource-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </a>

                  <a href="https://www.aad.org/public/diseases/skin-cancer" target="_blank" rel="noopener noreferrer" className="resource-link">
                    <div className="resource-card">
                      <h3>American Academy of Dermatology</h3>
                      <p>Educational resources, skin cancer screening information, and a find-a-dermatologist tool.</p>
                      <div className="resource-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </a>

                  <a href="https://www.melanoma.org/" target="_blank" rel="noopener noreferrer" className="resource-link">
                    <div className="resource-card">
                      <h3>Melanoma Research Foundation</h3>
                      <p>Research, education, advocacy, and support for patients with melanoma, the most serious form of skin cancer.</p>
                      <div className="resource-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </a>

                  <a href="https://www.cancer.gov/types/skin" target="_blank" rel="noopener noreferrer" className="resource-link">
                    <div className="resource-card">
                      <h3>National Cancer Institute</h3>
                      <p>Government resources for skin cancer research, treatment options, clinical trials, and statistics.</p>
                      <div className="resource-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </a>

                  <a href="https://www.cdc.gov/cancer/skin/" target="_blank" rel="noopener noreferrer" className="resource-link">
                    <div className="resource-card">
                      <h3>Centers for Disease Control and Prevention</h3>
                      <p>Public health information on skin cancer prevention, risk factors, and national statistics.</p>
                      <div className="resource-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="resource-cta">
                  <h3>Need More Information?</h3>
                  <p>
                    If you have specific questions about skin cancer or need assistance interpreting your analysis results, 
                    please reach out to our team or consult with a healthcare professional.
                  </p>
                  <Link href="/contact" className="resource-button">
                    Contact Our Team
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .resources-hero {
          background-color: ${isDarkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)'};
          padding: 8rem 0 4rem;
          text-align: center;
        }

        .resources-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(to right, var(--primary), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .resources-subtitle {
          font-size: 1.25rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          max-width: 700px;
          margin: 0 auto;
        }

        .resources-content {
          padding: 4rem 0 6rem;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
        }

        .resources-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          padding-bottom: 1rem;
        }

        .tab-button {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-button:hover {
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
        }

        .tab-button.active {
          color: var(--primary);
          font-weight: 600;
          border-bottom: 2px solid var(--primary);
          border-radius: 0.25rem 0.25rem 0 0;
        }

        .tab-content {
          padding: 1rem 0;
        }

        .tab-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .tab-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2rem 0 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .tab-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .tab-content p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          margin-bottom: 1.5rem;
        }

        .tab-content ul {
          margin: 1rem 0 2rem;
          padding-left: 1.5rem;
        }

        .tab-content li {
          margin-bottom: 0.75rem;
          font-size: 1.125rem;
          line-height: 1.6;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
        }

        .info-card {
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          padding: 1.5rem 2rem;
          border-radius: 1rem;
          margin: 2rem 0;
          box-shadow: var(--shadow);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .abcde-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .abcde-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: var(--shadow);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .letter {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          border-radius: 50%;
          flex-shrink: 0;
        }

        .content {
          flex: 1;
        }

        .content h4 {
          font-size: 1.25rem;
          margin: 0 0 0.5rem;
        }

        .content p {
          font-size: 1rem;
          margin: 0;
        }

        .video-container {
          margin: 3rem 0;
          text-align: center;
        }

        .video-embed {
          margin: 1.5rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          aspect-ratio: 16 / 9;
          background-color: #000;
        }

        .video-caption {
          font-size: 0.875rem;
          color: ${isDarkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
          text-align: center;
          margin-top: 1rem;
        }

        .prevention-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .prevention-item {
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: var(--shadow);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .prevention-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3.5rem;
          height: 3.5rem;
          margin-bottom: 1.5rem;
          border-radius: 50%;
          background-color: ${isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)'};
        }

        .prevention-icon svg {
          width: 1.75rem;
          height: 1.75rem;
          color: var(--primary);
        }

        .prevention-item h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem;
        }

        .prevention-item p {
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
        }

        .sunscreen-guide {
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          padding: 2rem;
          border-radius: 1rem;
          margin: 3rem 0;
          box-shadow: var(--shadow);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .sunscreen-guide h3 {
          margin-top: 0;
        }

        .cancer-type {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: var(--shadow);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
        }

        .type-image {
          width: 100%;
          height: 100%;
          min-height: 280px;
          background-size: cover;
          background-position: center;
        }

        .type-content {
          padding: 2rem 2rem 2rem 0;
        }

        .type-content h3 {
          margin-top: 0;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .resource-link {
          text-decoration: none;
          color: inherit;
        }

        .resource-card {
          background-color: ${isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
          padding: 2rem;
          border-radius: 1rem;
          height: 100%;
          box-shadow: var(--shadow);
          border: 1px solid ${isDarkMode ? 'var(--dark-border)' : 'var(--light-border)'};
          position: relative;
          transition: all 0.3s ease;
        }

        .resource-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .resource-card h3 {
          font-size: 1.25rem;
          margin: 0 0 1rem;
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .resource-card p {
          font-size: 1rem;
          margin: 0 0 2.5rem;
        }

        .resource-arrow {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 1.5rem;
          height: 1.5rem;
          color: var(--primary);
          transition: transform 0.2s ease;
        }

        .resource-card:hover .resource-arrow {
          transform: translateX(5px);
        }

        .resource-cta {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          margin-top: 3rem;
          padding: 3rem;
          border-radius: 1rem;
          text-align: center;
          color: white;
        }

        .resource-cta h3 {
          color: white;
          font-size: 1.75rem;
          margin-top: 0;
        }

        .resource-cta p {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
        }

        .resource-button {
          display: inline-block;
          background-color: white;
          color: var(--primary);
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }

        .resource-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 1024px) {
          .resources-tabs {
            justify-content: center;
          }
          
          .cancer-type {
            grid-template-columns: 1fr;
          }
          
          .type-image {
            height: 240px;
          }
          
          .type-content {
            padding: 2rem;
          }
        }

        @media (max-width: 768px) {
          .resources-title {
            font-size: 2.5rem;
          }
          
          .resources-hero {
            padding: 6rem 0 3rem;
          }
          
          .resources-content {
            padding: 3rem 0;
          }
          
          .tab-button {
            flex: 1 0 40%;
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  );
} 