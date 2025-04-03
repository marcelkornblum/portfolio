interface Contact {
  _id: string;
  type: string;
  display: string;
  link: string;
}

const Contact: React.FC<{ contact: Contact }> = ({ contact }) => {
  return (
    <div className="contact-item">
      <a href={contact.link} target="_blank" rel="noopener noreferrer">
        {contact.display}
      </a>
    </div>
  );
};

export default Contact;
