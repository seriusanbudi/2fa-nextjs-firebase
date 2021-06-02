import * as twofactor from "node-2fa";

export default (req, res) => {
  if (req.method === "POST") {
    const { secret, token } = req.body;
    const result = twofactor.verifyToken(secret, token);

    if (!result)
      return res
        .status(400)
        .json({ status: "failed", message: "Verification failed" });

    // if verification success
    if (result.delta === 0)
      return res
        .status(200)
        .json({ status: "success", message: "Verification success", delta: 0 });

    // If the token already expired
    if (result.delta === -1)
      return res
        .status(400)
        .json({
          status: "token_expired",
          message: "Your token expired",
          delta: -1,
        });

    // If the user inputing token to early
    if (result.delta === 1)
      return res
        .status(400)
        .json({
          status: "token_expired",
          message: "Your token not ready",
          delta: 1,
        });
  }
};
