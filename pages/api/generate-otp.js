import * as twofactor from "node-2fa";

export default (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    const newSecret = twofactor.generateSecret({
      name: "Sample MFA",
      account: email,
    });

    return res.status(200).json({ ...newSecret });
  }
};
