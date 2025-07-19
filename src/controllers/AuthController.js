const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper untuk response terstruktur
const apiResponse = (res, { status_code, message, data = null }) => {
  res.status(status_code).json({ status_code, message, data });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return apiResponse(res, {
        status_code: 400,
        message: "Email sudah terdaftar.",
        data: null,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password_hash });

    return apiResponse(res, {
      status_code: 201,
      message: "Registrasi berhasil.",
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Register Error:", err); // Tambahkan ini
    return apiResponse(res, {
      status_code: 500,
      message: "Server error.",
      data: null,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return apiResponse(res, {
        status_code: 400,
        message: "Email tidak ditemukan.",
        data: null,
      });
    }

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return apiResponse(res, {
        status_code: 400,
        message: "Password salah.",
        data: null,
      });
    }

    // Generate JWT
    const payload = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    return apiResponse(res, {
      status_code: 200,
      message: "Login berhasil.",
      data: {
        token,
        user: payload,
      },
    });
  } catch (err) {
    return apiResponse(res, {
      status_code: 500,
      message: "Server error.",
      data: null,
    });
  }
};
