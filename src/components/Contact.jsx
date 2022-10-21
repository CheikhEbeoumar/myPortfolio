import React from "react";

const Contact = () => {
  return (
    <div
      name="contact"
      className="w-full h-screen bg-[#00539CFF] flex justify-center items-center p-4 text-gray-300 "
    >
      <form method="POST" action="https://getform.io/f/30e8ec3b-51e2-4ffb-a0fd-23451f1e0f84" className="flex flex-col max-w-[600px] w-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-[#FFD662FF]">
            Contact
          </p>
          <p className="py-4">Send me a message</p>
        </div>
        <input
          className="bg-[#9ea6c77b] p-2"
          type="text"
          placeholder="Name"
          name="name"
        />
        <input
          className="bg-[#9ea6c77b] my-4 p-2"
          type="email"
          placeholder="Email"
          name="email"
        />
        <textarea
          className="bg-[#9ea6c77b] p-2"
          name="message"
          rows="10"
          placeholder="Message"
        ></textarea>
        <button className="text-white border-2 px-4 py-3 my-8 mx-auto flex items-center hover:bg-[#FFD662FF] hover:text-[#00539CFF] hover:border-[#FFD662FF]">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
