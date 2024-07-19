import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logout from './Logout';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
    const [editContactId, setEditContactId] = useState(null);
    const [editContact, setEditContact] = useState({ name: '', email: '', phone: '' });

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5001/api/contacts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setContacts(res.data);
        } catch (err) {
            console.error('Error fetching contacts:', err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleChange = (e) => {
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    };

    const handleEditChange = (e) => {
        setEditContact({ ...editContact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5001/api/contacts', newContact, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setContacts([...contacts, res.data]);
            setNewContact({ name: '', email: '', phone: '' });
        } catch (err) {
            console.error('Error adding contact:', err);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`http://localhost:5001/api/contacts/${editContactId}`, editContact, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setContacts(contacts.map(contact => (contact._id === editContactId ? res.data : contact)));
            setEditContactId(null);
            setEditContact({ name: '', email: '', phone: '' });
        } catch (err) {
            console.error('Error updating contact:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5001/api/contacts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setContacts(contacts.filter(contact => contact._id !== id));
        } catch (err) {
            console.error('Error deleting contact:', err);
        }
    };

    const handleEdit = (contact) => {
        setEditContactId(contact._id);
        setEditContact({ name: contact.name, email: contact.email, phone: contact.phone });
    };

    return (
        <div>
            <h1>Contacts</h1>
            <Logout />
            <form onSubmit={editContactId ? handleEditSubmit : handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={editContactId ? editContact.name : newContact.name}
                    onChange={editContactId ? handleEditChange : handleChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={editContactId ? editContact.email : newContact.email}
                    onChange={editContactId ? handleEditChange : handleChange}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={editContactId ? editContact.phone : newContact.phone}
                    onChange={editContactId ? handleEditChange : handleChange}
                />
                <button type="submit">{editContactId ? 'Update' : 'Add'} Contact</button>
            </form>
            <ul>
                {contacts.map(contact => (
                    <li key={contact._id}>
                        {contact.name} - {contact.email} - {contact.phone}
                        <button onClick={() => handleEdit(contact)}>Edit</button>
                        <button onClick={() => handleDelete(contact._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Contacts;
