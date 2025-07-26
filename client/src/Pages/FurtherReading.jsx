// import React from 'react';

// export default function FurtherReading({ articles = [] }) {
//     return (
//     <div className="bg-white rounded-lg shadow-sm border p-6" style={{borderColor: '#a1a189'}}>
//       <div className="flex items-center mb-4">
//         <div className="w-2 h-6 rounded-full mr-3" style={{backgroundColor: '#dcb084'}}></div>
//         <h2 className="text-xl font-semibold" style={{color: '#4f5e62'}}>Recommended Articles</h2>
//       </div>
      
//       {articles.length === 0 ? (
//         <div className="text-center py-8">
//           <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#e9dcef'}}>
//             <svg className="w-8 h-8" style={{color: '#a1a189'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//             </svg>
//           </div>
//           <p className="italic" style={{color: '#a1a189'}}>No recommendations yet.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {articles.map((article, index) => (
//             <div 
//               key={index} 
//               className="p-4 rounded-md border transition-all duration-200 cursor-pointer group hover:shadow-lg"
//               style={{borderColor: '#e9dcef'}}
//               onMouseEnter={(e) => e.target.style.backgroundColor = '#e9dcef'}
//               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//             >
//               <div className="flex items-start space-x-3">
//                 <div 
//                   className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
//                   style={{backgroundColor: '#dcb084'}}
//                 >
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className="font-medium transition-colors duration-200" style={{color: '#4f5e62'}}>
//                     {article.title}
//                   </h3>
//                   <p className="text-sm mt-2 line-clamp-3" style={{color: '#a1a189'}}>
//                     {article.summary}
//                   </p>
//                   <div className="flex items-center mt-3">
//                     <span 
//                       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
//                       style={{backgroundColor: '#e9dcef', color: '#4f5e62'}}
//                     >
//                       Recommended
//                     </span>
//                     <svg className="w-4 h-4 ml-auto transition-colors duration-200" style={{color: '#a1a189'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React from 'react';

export default function FurtherReading({ articles = [] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6" style={{ borderColor: '#a1a189' }}>
      <div className="flex items-center mb-4">
        <div className="w-2 h-6 rounded-full mr-3" style={{ backgroundColor: '#dcb084' }}></div>
        <h2 className="text-xl font-semibold" style={{ color: '#4f5e62' }}>Recommended Articles</h2>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#e9dcef' }}>
            <svg className="w-8 h-8" style={{ color: '#a1a189' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="italic" style={{ color: '#a1a189' }}>No recommendations yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div
                className="p-4 rounded-md border transition-all duration-200 group hover:shadow-lg"
                style={{ borderColor: '#e9dcef' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9dcef'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{ backgroundColor: '#dcb084' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium transition-colors duration-200" style={{ color: '#4f5e62' }}>
                      {article.title}
                    </h3>
                    <p className="text-sm mt-2 line-clamp-3" style={{ color: '#a1a189' }}>
                      {article.summary}
                    </p>
                    <div className="flex items-center mt-3">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ backgroundColor: '#e9dcef', color: '#4f5e62' }}
                      >
                        Recommended
                      </span>
                      <svg className="w-4 h-4 ml-auto transition-colors duration-200" style={{ color: '#a1a189' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
