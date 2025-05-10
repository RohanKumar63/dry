import React from 'react';

export const metadata = {
  title: 'Refund Policy | TheNutriDry',
  description: 'Refund policy for TheNutriDry products.',
};

export default function RefundPolicyPage() {
  return (
    <div className="pt-24 pb-16 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-playfair mb-6 text-gray-900">Refund policy</h1>
          
          <div className="prose prose-green max-w-none">
            <p>The NUtridry operates under AL AHAD TRADING COMPANY and is committed to ensuring customer satisfaction. If you are not entirely satisfied with your purchase, we're here to help.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Refunds</h2>
            <p>To be eligible for a refund, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
            <p>Refund requests must be submitted within 7 days of receiving the product.</p>
            <p>To initiate a refund, please contact us at [insert contact email or phone number].</p>
            <p>Once we receive your request, we will notify you of the status of your refund after inspection of the returned product.</p>
            <p>If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Exchanges</h2>
            <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, please contact us.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Shipping Costs</h2>
            <p>You will be responsible for paying for your own shipping costs for returning your item.</p>
            <p>Shipping costs are non-refundable.</p>
            <p>If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Non-Refundable Items</h2>
            <p>Perishable goods such as food items are exempt from being returned, except in the case of damage or defect.</p>
            <p>Any opened or used items cannot be refunded.</p>
            
            <p className="mt-8">If you have any questions regarding our refund policy, feel free to reach out to us at:</p>
            
            <div className="mt-4">
              <p className="font-semibold">AL AHAD TRADING COMPANY</p>
              <p>122/3, Awadh Vihar Colony, Near Amausi Intl. Airport, Kanpur Road, Lucknow, Uttar Pradesh-226023</p>
              <p>Email Id:-info.nutridry@gmail.com.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}