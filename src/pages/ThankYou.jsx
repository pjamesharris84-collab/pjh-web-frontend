export default function ThankYou() {
  return (
    <div className="bg-pjh-slate text-pjh-light min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
      <img
        src="/pjh-logo-light.png"
        alt="PJH Web Services logo"
        className="w-32 mb-8 drop-shadow-lg"
      />
      <h1 className="section-heading mb-4">Thank You!</h1>
      <p className="max-w-xl text-pjh-muted text-lg">
        Your message has been received successfully.  
        One of our team members will get back to you within 2 business days.
      </p>
      <p className="text-pjh-muted mt-4">
        In the meantime, feel free to browse our services or connect with us on social media.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <a href="/" className="btn-primary">
          Return Home
        </a>
        <a href="/contact" className="btn-secondary">
          Send Another Message
        </a>
      </div>
    </div>
  );
}
