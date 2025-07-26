import React from 'react';


export default function RecentDoc({ history }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6" style={{ borderColor: '#a1a189' }}>
      <div className="flex items-center mb-4">
        <div className="w-2 h-6 rounded-full mr-3" style={{ backgroundColor: '#729598' }}></div>
        <h2 className="text-xl font-semibold" style={{ color: '#4f5e62' }}>Recent Documents</h2>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#e9dcef' }}>
            <svg className="w-8 h-8" style={{ color: '#a1a189' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="italic" style={{ color: '#a1a189' }}>No recent documents.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((doc) => (
            <div
              key={doc._id}
              className="p-4 rounded-md border transition-all duration-200 cursor-pointer group hover:shadow-lg"
              style={{
                borderColor: '#e9dcef'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9dcef'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div className="flex items-start space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                  style={{ backgroundColor: '#729598' }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium transition-colors duration-200 truncate" style={{ color: '#4f5e62' }}>
                    {doc.filename}
                  </h3>
                  {doc.summary && (
                    <p className="text-sm mt-1 line-clamp-2" style={{ color: '#a1a189' }}>
                      {doc.summary.slice(0, 100)}...
                    </p>
                  )}
                  <div className="flex items-center mt-2 text-xs" style={{ color: '#a1a189' }}>
                    <span>{new Date(doc.uploadDate).toLocaleString()}</span>
                    <div className="w-1 h-1 rounded-full mx-2" style={{ backgroundColor: '#a1a189' }}></div>
                    <span>PDF</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
