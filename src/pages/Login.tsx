import { Icon } from "@iconify/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { publicApiCall } from "../utils/api";

function Login() {
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const response = await publicApiCall('/api/login', {
				method: "POST",
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Login failed");
			}

			localStorage.setItem("accessToken", data.data.access_token);
			
			const tokenPayload = JSON.parse(
				atob(data.data.access_token.split('.')[1])
			);
			
			const userType = tokenPayload.user_type;
			const userId = tokenPayload.user_id;
			
			localStorage.setItem("userRole", userType);
			localStorage.setItem("userId", userId);

			if (userType === "super_admin") {
				navigate("/admin?panel=admin-manage");
			} else if (userType === "admin") {
				navigate("/admin?panel=about-us");
			} else {
				throw new Error("Invalid user type");
			}

		} catch (err) {
			console.error("Login error:", err);
			setError(err instanceof Error ? err.message : "Login failed");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex justify-between h-screen bg-[#171717]">
			<div className="md:hidden block w-[273px] h-[291px] bg-[#3D0FA8] opacity-50 blur-3xl rounded-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"></div>
			<div className="w-full h-full items-center justify-center">
				<div className="flex flex-col h-screen md:justify-between justify-center md:py-30 md:px-25 md:pt-50 p-10">
					<form
						onSubmit={submitHandler}
						className="flex flex-col gap-2 z-99"
					>
						<p className="text-[40px] gilda-font">Welcome Back!</p>
						<p className="text-[18px]">
							Your expertise is essential for managing our
							platform, and we are excited to support your vision
							for improvement and innovation.
						</p>

						{/* Error Message */}
						{error && (
							<div className="bg-red-500 text-white p-3 rounded-md mt-4 text-sm">
								{error}
							</div>
						)}

						<div className="flex flex-col pt-10 gap-7">
							<div className="gap-1">
								<p className="text-[16px] font-bold">Email</p>
								<input
									onChange={(e) => setEmail(e.target.value)}
									type="email"
									placeholder="Your Email"
									className="w-full md:px-[12px] px-[16px] py-[12px] md:py-[8px] rounded-md outline-none border border-[#737373] disabled:opacity-50 disabled:cursor-not-allowed"
									required
									disabled={isLoading}
									value={email}
								/>
							</div>
							<div className="gap-1">
								<p className="text-[16px] font-bold">
									Password
								</p>
								<div className="flex items-center w-full md:px-[12px] px-[16px] py-[12px] md:py-[8px] rounded-md outline-none border border-[#737373]">
									<input
										onChange={(e) =>
											setPassword(e.target.value)
										}
										type={
											showPassword ? "password" : "text"
										}
										placeholder="Your Password"
										className="w-full outline-none disabled:opacity-50 disabled:cursor-not-allowed"
										required
										disabled={isLoading}
										value={password}
									/>
									<div
										className={`cursor-pointer ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
										onClick={() =>
											setShowPassword(!showPassword)
										}
									>
										{showPassword ? (
											<Icon
												icon="el:eye-close"
												width="20"
												height="20"
											/>
										) : (
											<Icon
												icon="el:eye-open"
												width="20"
												height="20"
											/>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="flex rounded md:w-1/3 p-2 mt-4 bg-[#303030] cursor-pointer w-full">
							<button
								type="submit"
								className="w-full bg-white rounded-md text-black cursor-pointer text-center py-2 disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center justify-center gap-2">
										<div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
										Logging in...
									</div>
								) : (
									"Login"
								)}
							</button>
						</div>
					</form>
					<div className="md:pt-0 pt-10">
						<p className="">
							Don't have any account yet? contact the (who?)
						</p>
					</div>
				</div>
			</div>
			<div className="md:block hidden w-[818px] h-[872px] bg-[#3D0FA8] opacity-50 blur-3xl rounded-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"></div>
			<div className="md:flex hidden bg-black w-full items-center justify-center z-99">
				<img
					src="/assets/logo/business-units/Magna.png"
					alt="Magna Logo"
					width={300}
					height={300}
				/>
			</div>
		</div>
	);
}

export default Login;