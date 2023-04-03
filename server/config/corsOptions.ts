const allowlist = [
  "https://orbd.onrender.com/",
  "http://localhost:5173"
];

export const corsOptionsDelegate = (req, callback) => {

  let corsOptions = { 
    origin: false,
    credentials: true
  };

  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
  }

  callback(null, corsOptions); // callback expects two parameters: error and options
}