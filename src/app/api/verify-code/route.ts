import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, code } = await request.json()
        // console.log({ username, code });

        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername })
        if (!user) {
            return Response.json({
                success: false,
                message: "user not found..."
            }, { status: 400 })
        }
        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save()
            return Response.json({
                success: true,
                message: "Account verified successfully..."
            }, { status: 200 })
        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "Verification code has expired,please sing-up again to get the new code"
            }, { status: 400 })
        } else {
            return Response.json({
                success: false,
                message: "Incorrect Verification code"
            }, { status: 400 })
        }

    } catch (err) {
        console.error("Error verifying user...", err)
        return Response.json(
            {
                success: false,
                message: "Error verifying user..."
            },
            { status: 500 }
        )
    }
}