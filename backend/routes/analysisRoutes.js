const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');
const { protect } = require('../middleware/auth');

// @desc    Save analysis result
// @route   POST /api/analysis
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { image, result } = req.body;

    if (!image || !result) {
      return res.status(400).json({ message: 'Image and result are required' });
    }

    const analysis = await Analysis.create({
      user: req.user._id,
      userName: req.user.name,
      image,
      result
    });

    res.status(201).json({
      success: true,
      _id: analysis._id
    });
  } catch (error) {
    console.error('Save analysis error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get user's analysis history
// @route   GET /api/analysis
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(analyses);
  } catch (error) {
    console.error('Get analysis history error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get single analysis by ID
// @route   GET /api/analysis/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    // Check if the analysis belongs to the user
    if (analysis.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this analysis' });
    }

    res.json(analysis);
  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 