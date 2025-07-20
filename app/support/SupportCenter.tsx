'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SupportItem {
  id: string;
  title: string;
  description: string;
  category: 'crisis' | 'help' | 'privacy';
  content: string;
  urgent?: boolean;
}

const supportItems: SupportItem[] = [
  {
    id: 'crisis-hotline',
    title: 'Crisis Hotline',
    description: 'Immediate help for mental health emergencies',
    category: 'crisis',
    urgent: true,
    content: `
      <h3>National Suicide Prevention Lifeline</h3>
      <p><strong>Phone:</strong> 988 (Available 24/7)</p>
      <p><strong>Text:</strong> Text "HELLO" to 741741</p>
      <p><strong>Chat:</strong> <a href="https://suicidepreventionlifeline.org/chat/" target="_blank">Online Chat Available</a></p>
      
      <h3>Crisis Text Line</h3>
      <p><strong>Text:</strong> HOME to 741741</p>
      <p>Free, 24/7 support for those in crisis</p>
      
      <h3>International Resources</h3>
      <ul>
        <li><strong>UK:</strong> Samaritans - 116 123</li>
        <li><strong>Canada:</strong> Talk Suicide Canada - 1-833-456-4566</li>
        <li><strong>Australia:</strong> Lifeline - 13 11 14</li>
      </ul>
      
      <div class="emergency-warning">
        <p><strong>If you are in immediate danger, call emergency services (911, 999, 000) immediately.</strong></p>
      </div>
    `
  },
  {
    id: 'mental-health-resources',
    title: 'Mental Health Resources',
    description: 'Professional help and treatment options',
    category: 'crisis',
    content: `
      <h3>Finding Professional Help</h3>
      <ul>
        <li><strong>Psychology Today:</strong> Find therapists in your area</li>
        <li><strong>SAMHSA Treatment Locator:</strong> Substance abuse and mental health services</li>
        <li><strong>Your insurance provider:</strong> Check covered mental health professionals</li>
        <li><strong>Community health centers:</strong> Often provide affordable mental health services</li>
      </ul>
      
      <h3>Types of Mental Health Professionals</h3>
      <ul>
        <li><strong>Psychiatrists:</strong> Medical doctors who can prescribe medication</li>
        <li><strong>Psychologists:</strong> Provide therapy and psychological testing</li>
        <li><strong>Licensed Counselors:</strong> Provide counseling and therapy</li>
        <li><strong>Social Workers:</strong> Provide therapy and connect to resources</li>
      </ul>
      
      <h3>Online Therapy Options</h3>
      <ul>
        <li>BetterHelp</li>
        <li>Talkspace</li>
        <li>MDLIVE</li>
        <li>Amwell</li>
      </ul>
    `
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'How we protect and use your information',
    category: 'privacy',
    content: `
      <h3>Information We Collect</h3>
      <p>Dr. LUMI Mental Health App collects only the information necessary to provide you with personalized mental health support:</p>
      <ul>
        <li><strong>Account Information:</strong> Email address, display name, and basic profile data</li>
        <li><strong>Chat Data:</strong> Conversations with Dr. LUMI for providing personalized responses</li>
        <li><strong>Mood Data:</strong> Your mood tracking entries and patterns</li>
        <li><strong>Journal Entries:</strong> Personal reflections you choose to save</li>
        <li><strong>Usage Data:</strong> How you interact with the app to improve functionality</li>
      </ul>
      
      <h3>How We Use Your Information</h3>
      <ul>
        <li>Provide personalized mental health support and insights</li>
        <li>Track your progress and mood patterns over time</li>
        <li>Improve our AI responses and recommendations</li>
        <li>Send you relevant notifications and reminders (if enabled)</li>
        <li>Ensure the security and proper functioning of our services</li>
      </ul>
      
      <h3>Data Security</h3>
      <p>We implement industry-standard security measures:</p>
      <ul>
        <li>All data is encrypted in transit and at rest</li>
        <li>We use secure, HIPAA-compliant cloud infrastructure</li>
        <li>Access to your data is strictly limited to essential personnel</li>
        <li>Regular security audits and updates</li>
      </ul>
      
      <h3>Your Rights</h3>
      <p>You have the right to:</p>
      <ul>
        <li>Access all data we have about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Delete your account and all associated data</li>
        <li>Export your data in a readable format</li>
        <li>Opt-out of data collection for analytics</li>
      </ul>
      
      <h3>Data Sharing</h3>
      <p><strong>We do not sell or share your personal health information.</strong> Limited sharing only occurs:</p>
      <ul>
        <li>With your explicit consent</li>
        <li>When required by law or court order</li>
        <li>To prevent harm to you or others</li>
        <li>With service providers under strict confidentiality agreements</li>
      </ul>
      
      <h3>Contact Us</h3>
      <p>For privacy questions or to exercise your rights, contact us at:</p>
      <p><strong>Email:</strong> privacy@drlumi.com</p>
      <p><strong>Address:</strong> Data Protection Officer, Dr. LUMI, 123 Health St, Wellness City, WC 12345</p>
    `
  },
  {
    id: 'help-center',
    title: 'Help Center',
    description: 'Frequently asked questions and troubleshooting',
    category: 'help',
    content: `
      <h3>Getting Started</h3>
      <div class="faq-item">
        <h4>How do I start using Dr. LUMI?</h4>
        <p>Simply create an account and begin chatting with Dr. LUMI. The AI will learn about your needs and provide personalized support.</p>
      </div>
      
      <div class="faq-item">
        <h4>Is Dr. LUMI a replacement for therapy?</h4>
        <p>No, Dr. LUMI is a supportive tool and should not replace professional mental health care. If you're experiencing severe symptoms, please seek professional help.</p>
      </div>
      
      <h3>Using the App</h3>
      <div class="faq-item">
        <h4>How does mood tracking work?</h4>
        <p>You can log your daily mood on the dashboard. Over time, this creates patterns that help you and Dr. LUMI understand your mental health trends.</p>
      </div>
      
      <div class="faq-item">
        <h4>Can I delete my chat history?</h4>
        <p>Yes, you can delete individual conversations or your entire chat history from the dashboard settings.</p>
      </div>
      
      <div class="faq-item">
        <h4>How do I export my data?</h4>
        <p>Go to Settings > Privacy > Export Data to download all your information in a readable format.</p>
      </div>
      
      <h3>Technical Issues</h3>
      <div class="faq-item">
        <h4>The app isn't loading properly</h4>
        <p>Try refreshing your browser, clearing your cache, or using an incognito/private browsing window.</p>
      </div>
      
      <div class="faq-item">
        <h4>I'm not receiving notifications</h4>
        <p>Check your browser notification settings and ensure you've enabled notifications in the app settings.</p>
      </div>
      
      <h3>Account & Billing</h3>
      <div class="faq-item">
        <h4>How do I delete my account?</h4>
        <p>Go to Settings > Account > Delete Account. This will permanently remove all your data.</p>
      </div>
      
      <div class="faq-item">
        <h4>Is Dr. LUMI free to use?</h4>
        <p>Dr. LUMI offers both free and premium features. The core mental health support is available to everyone.</p>
      </div>
      
      <h3>Still Need Help?</h3>
      <p>If you can't find the answer to your question, please contact our support team:</p>
      <p><strong>Email:</strong> support@drlumi.com</p>
      <p><strong>Response Time:</strong> Within 24 hours</p>
    `
  },
  {
    id: 'emergency-contacts',
    title: 'Emergency Contacts',
    description: 'Important numbers for immediate help',
    category: 'crisis',
    urgent: true,
    content: `
      <div class="emergency-grid">
        <div class="emergency-card">
          <h3>🆘 Emergency Services</h3>
          <p><strong>Call 911</strong> (US) for immediate danger</p>
          <p><strong>Call 999</strong> (UK) for immediate danger</p>
          <p><strong>Call 000</strong> (Australia) for immediate danger</p>
        </div>
        
        <div class="emergency-card">
          <h3>📞 Suicide Prevention</h3>
          <p><strong>988</strong> - National Suicide Prevention Lifeline</p>
          <p><strong>Text "HELLO" to 741741</strong> - Crisis Text Line</p>
        </div>
        
        <div class="emergency-card">
          <h3>🏥 Mental Health Crisis</h3>
          <p><strong>1-800-950-NAMI (6264)</strong> - NAMI Helpline</p>
          <p><strong>1-800-662-4357</strong> - SAMHSA National Helpline</p>
        </div>
        
        <div class="emergency-card">
          <h3>💬 Text Support</h3>
          <p><strong>Text HOME to 741741</strong> - Crisis Text Line</p>
          <p><strong>Text "NAMI" to 741741</strong> - NAMI Crisis Support</p>
        </div>
      </div>
      
      <h3>Specialized Support Lines</h3>
      <ul>
        <li><strong>LGBTQ+ Crisis:</strong> 1-866-488-7386 (Trevor Project)</li>
        <li><strong>Veterans:</strong> 1-800-273-8255, Press 1</li>
        <li><strong>Teens:</strong> 1-800-852-8336 (Teen Line)</li>
        <li><strong>Substance Abuse:</strong> 1-800-662-4357</li>
        <li><strong>Domestic Violence:</strong> 1-800-799-7233</li>
        <li><strong>Sexual Assault:</strong> 1-800-656-4673</li>
      </ul>
      
      <div class="important-note">
        <h3>⚠️ When to Seek Immediate Help</h3>
        <ul>
          <li>Thoughts of suicide or self-harm</li>
          <li>Plans to hurt yourself or others</li>
          <li>Severe depression or anxiety that interferes with daily life</li>
          <li>Panic attacks or severe anxiety episodes</li>
          <li>Psychotic symptoms (hallucinations, delusions)</li>
          <li>Substance abuse emergencies</li>
        </ul>
      </div>
    `
  },
  {
    id: 'data-security',
    title: 'Data Security',
    description: 'How we keep your information safe',
    category: 'privacy',
    content: `
      <h3>Security Measures</h3>
      <p>Dr. LUMI takes your data security seriously. We implement multiple layers of protection:</p>
      
      <h4>Encryption</h4>
      <ul>
        <li><strong>In Transit:</strong> All data is encrypted using TLS 1.3 during transmission</li>
        <li><strong>At Rest:</strong> Data stored on our servers is encrypted using AES-256</li>
        <li><strong>End-to-End:</strong> Sensitive health data uses additional encryption layers</li>
      </ul>
      
      <h4>Infrastructure Security</h4>
      <ul>
        <li>HIPAA-compliant cloud hosting</li>
        <li>Regular security audits and penetration testing</li>
        <li>Multi-factor authentication for all staff access</li>
        <li>Automated security monitoring and threat detection</li>
      </ul>
      
      <h4>Access Controls</h4>
      <ul>
        <li>Strict need-to-know basis for data access</li>
        <li>All access is logged and monitored</li>
        <li>Regular access reviews and revocation</li>
        <li>Background checks for all personnel</li>
      </ul>
      
      <h3>Data Retention</h3>
      <p>We retain your data only as long as necessary:</p>
      <ul>
        <li><strong>Active accounts:</strong> Data retained while account is active</li>
        <li><strong>Inactive accounts:</strong> Data deleted after 2 years of inactivity</li>
        <li><strong>Deleted accounts:</strong> Data permanently deleted within 30 days</li>
        <li><strong>Backups:</strong> Securely destroyed within 90 days</li>
      </ul>
      
      <h3>Incident Response</h3>
      <p>In the unlikely event of a security incident:</p>
      <ul>
        <li>Immediate containment and assessment</li>
        <li>Notification within 72 hours if personal data affected</li>
        <li>Full investigation and remediation</li>
        <li>Transparent communication about impact and resolution</li>
      </ul>
      
      <h3>Your Security</h3>
      <p>Help us keep your data secure:</p>
      <ul>
        <li>Use a strong, unique password</li>
        <li>Log out when using shared devices</li>
        <li>Keep your browser and device updated</li>
        <li>Report any suspicious activity immediately</li>
      </ul>
      
      <p><strong>Report Security Issues:</strong> security@drlumi.com</p>
    `
  }
];

export default function SupportCenter() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'crisis' | 'help' | 'privacy'>('all');
  const [selectedItem, setSelectedItem] = useState<SupportItem | null>(null);

  const categories = [
    { key: 'all', label: 'All Resources', icon: 'ri-book-line' },
    { key: 'crisis', label: 'Crisis Resources', icon: 'ri-alarm-warning-line' },
    { key: 'help', label: 'Help Center', icon: 'ri-question-line' },
    { key: 'privacy', label: 'Privacy & Security', icon: 'ri-shield-check-line' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? supportItems 
    : supportItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Support Center</h1>
            <p className="text-gray-600">Get help, find resources, and learn about your privacy</p>
          </div>
          <Link href="/dashboard" className="text-gray-600 hover:text-red-600 transition-colors">
            <i className="ri-arrow-left-line text-xl mr-2"></i>
            Back to Dashboard
          </Link>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-500 text-white p-4 rounded-lg mb-8">
          <div className="flex items-center">
            <i className="ri-alarm-warning-line text-2xl mr-3"></i>
            <div>
              <h3 className="font-semibold">In Crisis? Get Immediate Help</h3>
              <p className="text-sm">Call 988 for suicide prevention or 911 for emergencies</p>
            </div>
          </div>
        </div>

        {selectedItem ? (
          /* Detail View */
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <i className="ri-arrow-left-line text-xl mr-2"></i>
                Back to support center
              </button>
              {selectedItem.urgent && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  Urgent
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedItem.title}</h2>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedItem.content }}
              style={{
                '--tw-prose-headings': '#1f2937',
                '--tw-prose-body': '#374151',
                '--tw-prose-links': '#3b82f6'
              }}
            />
          </div>
        ) : (
          /* Grid View */
          <>
            {/* Category Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key as any)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                      selectedCategory === category.key
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <i className={`${category.icon} mr-2`}></i>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Support Items Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer p-6 ${
                    item.urgent ? 'ring-2 ring-red-200' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      item.category === 'crisis' ? 'bg-red-500' :
                      item.category === 'help' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}>
                      <i className={`text-xl text-white ${
                        item.category === 'crisis' ? 'ri-alarm-warning-line' :
                        item.category === 'help' ? 'ri-question-line' :
                        'ri-shield-check-line'
                      }`}></i>
                    </div>
                    {item.urgent && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        Urgent
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.category === 'crisis' ? 'bg-red-100 text-red-800' :
                      item.category === 'help' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.category === 'crisis' ? 'Crisis Resources' :
                       item.category === 'help' ? 'Help Center' :
                       'Privacy & Security'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .prose h3 {
          color: #1f2937;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h4 {
          color: #374151;
          font-size: 1.125rem;
          font-weight: 500;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .prose ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .emergency-warning {
          background-color: #fef2f2;
          border: 2px solid #fca5a5;
          border-radius: 8px;
          padding: 1rem;
          margin: 1.5rem 0;
        }
        .emergency-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }
        .emergency-card {
          background-color: #fef2f2;
          border: 1px solid #fca5a5;
          border-radius: 8px;
          padding: 1rem;
        }
        .emergency-card h3 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          font-size: 1.125rem;
        }
        .faq-item {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .faq-item h4 {
          margin-top: 0;
          color: #1f2937;
        }
        .important-note {
          background-color: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 8px;
          padding: 1rem;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}