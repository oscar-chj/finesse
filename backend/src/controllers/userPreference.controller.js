const { UserPreference } = require('../models');

const userPreferenceController = {
  // Get user preferences
  async getUserPreferences(req, res) {
    try {
      const preferences = await UserPreference.findOne({ userId: req.user.uid });
      if (!preferences) {
        // Create default preferences if none exist
        const defaultPreferences = await UserPreference.create({
          userId: req.user.uid
        });
        return res.json(defaultPreferences);
      }
      res.json(preferences);
    } catch (error) {
      console.error('Get Preferences Error:', error);
      res.status(500).json({ message: 'Error fetching preferences' });
    }
  },

  // Update user preferences
  async updatePreferences(req, res) {
    try {
      const { theme, notifications, dashboardLayout } = req.body;
      
      const preferences = await UserPreference.findOneAndUpdate(
        { userId: req.user.uid },
        { theme, notifications, dashboardLayout },
        { new: true, upsert: true }
      );
      
      res.json(preferences);
    } catch (error) {
      console.error('Update Preferences Error:', error);
      res.status(500).json({ message: 'Error updating preferences' });
    }
  }
};

module.exports = userPreferenceController; 