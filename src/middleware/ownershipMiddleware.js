const checkOwnership = (Model, ownerField = "createdBy") => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params.id);

      if (!resource) return res.status(404).json({ message: "Not found" });

      // Allow admins to bypass ownership check
      if (req.user.role !== "admin" && resource[ownerField].toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not allowed" });
      }

      req.resource = resource;
      next();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = { checkOwnership };
