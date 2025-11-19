const Lead = require('../models/leadModel');

// Listar todos os leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.getAll();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar novo lead
exports.createLead = async (req, res) => {
  try {
    const newLead = await Lead.create(req.body);
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar lead
exports.updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.update(req.params.id, req.body);
    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar lead
exports.deleteLead = async (req, res) => {
  try {
    await Lead.delete(req.params.id);
    res.json({ message: 'Lead deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
