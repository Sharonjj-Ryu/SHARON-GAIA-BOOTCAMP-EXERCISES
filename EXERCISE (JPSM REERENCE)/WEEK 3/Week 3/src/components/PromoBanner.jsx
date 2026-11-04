function PromoBanner() {
  return (
    <div
      style={{
        backgroundColor: '#FCE4E4',
        borderRadius: '28px',
        padding: '48px 40px',
        margin: '20px auto 40px auto',
        maxWidth: '1100px',
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        minHeight: '360px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: '500', color: '#202124' }}>New</span>

        <h2
          style={{
            fontSize: '36px',
            fontWeight: '500',
            color: '#202124',
            margin: '0',
            lineHeight: '1.15',
            letterSpacing: '-0.5px',
          }}
        >
          Google Pixel 11
          <br />
          Pro and Pro XL
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: '#3c4043',
            margin: '4px 0 16px 0',
            fontWeight: '400',
          }}
        >
          Attention-grabbing. Not attention-seeking.
        </p>

        <button
          type="button"
          onClick={() => alert('Redirecting to Pixel 11 Pro page...')}
          style={{
            backgroundColor: '#1f1f1f',
            color: '#ffffff',
            border: 'none',
            borderRadius: '20px',
            padding: '10px 22px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          Learn more
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          right: '-20px',
          bottom: '-40px',
          top: '-20px',
          width: '60%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZYph7R3LMBXDXDMEqqDlZBa6YoOlqZRKjTsn3DeQO8e5esV-BvEMELM&s=10"
          alt="Google Pixel 11 Pro"
          style={{
            height: '120%',
            objectFit: 'contain',
            objectPosition: 'right center',
          }}
        />
      </div>
    </div>
  );
}

export default PromoBanner;