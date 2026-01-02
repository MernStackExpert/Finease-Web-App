const FAQ = () => (
  <section className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
    <div className="space-y-4">
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="faq-acc" defaultChecked /> 
        <div className="collapse-title text-xl font-medium">Is FinEase free to use?</div>
        <div className="collapse-content"><p>Yes! Our basic tracking features are 100% free forever.</p></div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="faq-acc" /> 
        <div className="collapse-title text-xl font-medium">How do I export my data?</div>
        <div className="collapse-content"><p>Go to the Reports page and click the 'Download PDF' button (Coming Soon).</p></div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="faq-acc" /> 
        <div className="collapse-title text-xl font-medium">Can I add multiple currencies?</div>
        <div className="collapse-content"><p>Currently, we support USD, but we are working on multi-currency support.</p></div>
      </div>
    </div>
  </section>
);
export default FAQ;