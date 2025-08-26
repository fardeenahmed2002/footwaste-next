
const page = () => {
    return (
        <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-md">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
                Food Donation Policy & Regulations
            </h1>

            <p className="mb-8 text-gray-700 text-center">
                Our mission is to rescue surplus food and deliver it to people in need.
                To maintain quality and safety, all donors and NGOs must follow the
                guidelines outlined below.
            </p>

            {/* Eligibility */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-green-600">
                    Eligibility
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Individuals, restaurants, caterers, or event organizers may donate.</li>
                    <li>Food must be safe, hygienic, and suitable for human consumption.</li>
                    <li>Expired, spoiled, or unpackaged food will not be accepted.</li>
                </ul>
            </section>

            {/* Required Information */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-green-600">
                    Required Information from Donors
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Title of the food item</li>
                    <li>Description</li>
                    <li>Quantity (e.g., 5 boxes, 3 plates)</li>
                    <li>Pickup location</li>
                    <li>Expiry date</li>
                    <li>Pickup time</li>
                    <li>Cooked time</li>
                    <li>Food type (Veg / Non-Veg)</li>
                    <li>Food category (Cooked / Raw / Packaged)</li>
                    <li>Storage condition (Refrigerated / Room Temperature)</li>
                    <li>Image of the donated food</li>
                </ul>
            </section>

            {/* Food Safety Guidelines */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-green-600">
                    Food Safety Guidelines
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Food must be freshly prepared and stored properly before pickup.</li>
                    <li>Avoid donating half-eaten food or items left uncovered.</li>
                    <li>Pack food in clean containers or boxes before donation.</li>
                    <li>Hot food must be cooled safely before storage.</li>
                </ul>
            </section>

            {/* Donor Responsibilities */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-green-600">
                    Donor Responsibilities
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Provide complete and truthful information in the donation form.</li>
                    <li>Ensure food is ready for pickup at the agreed time.</li>
                    <li>Inform at least 1 hour before if the donation needs to be canceled.</li>
                    <li>Cooperate with NGO volunteers during pickup.</li>
                </ul>
            </section>

            {/* NGO Responsibilities */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-green-600">
                    NGO Responsibilities
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Collect food from donors within the scheduled time.</li>
                    <li>Maintain hygiene during collection and distribution.</li>
                    <li>Distribute fairly to communities in need.</li>
                    <li>Report back to admin if food is spoiled or unfit for use.</li>
                </ul>
            </section>

            {/* Rules & Regulations */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-green-600">
                    Rules & Regulations
                </h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>Donors cannot directly choose the recipient NGO/individual.</li>
                    <li>Distribution is managed only by verified NGOs assigned by the admin.</li>
                    <li>Incomplete or false information will result in rejection.</li>
                    <li>Admin reserves the right to reject any unsafe donation.</li>
                </ol>
            </section>

            {/* Process Overview */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-green-600">
                    Process Flow
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    1. Donor submits the food donation form with all details. <br />
                    2. Admin reviews and approves the donation request. <br />
                    3. A verified NGO is assigned to collect the food. <br />
                    4. NGO collects food at the scheduled pickup time. <br />
                    5. Food is distributed to underprivileged communities. <br />
                </p>
            </section>

            {/* Legal Disclaimer */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-green-600">
                    Legal Disclaimer
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    By donating food, you confirm that the food is safe and suitable for
                    human consumption. Our organization and partner NGOs are not liable
                    for any issues arising from spoiled or improperly handled food. Donors
                    are responsible for ensuring the quality of their donation before
                    pickup.
                </p>
            </section>

            {/* Contact Section */}
            <section>
                <h2 className="text-xl font-semibold mb-3 text-green-600">
                    Contact & Support
                </h2>
                <p className="text-gray-700">
                    If you have questions about the donation process or face any issues,
                    please contact our support team at:
                </p>
                <p className="text-gray-800 font-semibold mt-2">
                    📧 support@foodrescue.org <br />
                    ☎️ +880-1234-567890
                </p>
            </section>

            {/* Footer Note */}
            <p className="mt-10 text-gray-600 italic text-center">
                By using our platform, you agree to follow all policies and cooperate
                with our verified NGO partners for a successful food rescue mission.
            </p>
        </div>
    );
}

export default page
