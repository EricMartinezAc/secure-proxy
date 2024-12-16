// src/utils/ResponsiveUtils.js
class ResponsiveUtils {
  static sendResponse(res, statusCode, message, data = null) {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static sendErrorResponse(res, statusCode, message) {
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
}

export default ResponsiveUtils;
