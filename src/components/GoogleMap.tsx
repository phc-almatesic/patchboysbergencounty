export default function GoogleMap() {
  return (
    <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703!2d-74.11976389999999!3d40.6976684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f87e7d3e4c01%3A0x6cd89234bfc59d92!2sBergen%20County%2C%20NJ!5e0!3m2!1sen!2sus!4v1708000000000!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="The Patch Boys of Bergen County - Service Area Map"
      />
    </div>
  );
}
