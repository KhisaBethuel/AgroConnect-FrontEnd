import { useState } from 'react';
import {Link} from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log({ email, password });
    }
  };

  const emailValidation = {
    isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    message: 'Please enter a valid email address'
  };

  const passwordValidation = {
    isValid: password.length >= 8,
    message: 'Password must be at least 8 characters'
  };

  const isFormValid = emailValidation.isValid && passwordValidation.isValid;

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-gray-200">
      <div className="absolute inset-0 flex items-center justify-center bg-[url('https://frederica.pt/cdn/shop/articles/plantas-scaled.jpg?v=1696650424&width=1440')] rounded-2xl bg-center bg-no-repeat bg-[length:90%_90%]" />
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="max-w-md space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 relative">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
            Welcome Back
          </h2>
          <p className="text-sm text-white/80">
            New here? <a href="/signup" className="text-white hover:text-white/80 underline">Create an account</a>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="relative group">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5 transition-colors group-hover:text-white/90 z-10" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`pl-10 w-full px-4 py-3 border ${
                    touched.email && !emailValidation.isValid 
                      ? 'border-red-400/50' 
                      : 'border-white/20'
                  } rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20`}
                  placeholder="Email"
                />
              </div>
              {touched.email && !emailValidation.isValid && (
                <p className="text-red-500 text-sm pl-2">{emailValidation.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <div className="relative group">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5 transition-colors group-hover:text-white/90 z-10" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  className="pl-10 w-full px-4 py-3 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors z-10"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {touched.password && !passwordValidation.isValid && (
                <p className="text-red-500 text-sm pl-2">{passwordValidation.message}</p>
              )}
              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm text-white hover:text-white/80 underline">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`group relative w-full flex justify-center py-3 px-4 border border-white/20 text-sm font-medium rounded-xl text-white ${
                isFormValid 
                  ? 'bg-white/20 hover:bg-white/30' 
                  : 'bg-white/10 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 backdrop-blur-sm`}
            >
              Sign In
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="text-white/80 text-sm">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          <div className="mt-6">
           <a href="https://accounts.google.com"> <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/20 rounded-xl text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 backdrop-blur-sm"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;