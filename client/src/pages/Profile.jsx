import { useState } from 'react';
import { HiOutlineUser, HiOutlineAcademicCap, HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';
import toast from 'react-hot-toast';
import { generateAvatar } from '../utils/helpers';
import { BADGE_DEFINITIONS } from '../constants';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [profileLoading, setProfileLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    college: user?.college || '',
    branch: user?.branch || '',
    graduationYear: user?.graduationYear || '',
  });

  const [passData, setPassData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePassChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!profileData.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    setProfileLoading(true);
    await updateProfile(profileData);
    setProfileLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!passData.currentPassword) {
      toast.error('Current password is required');
      return;
    }
    if (passData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (passData.newPassword !== passData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setPassLoading(true);
    const res = await changePassword(passData.currentPassword, passData.newPassword);
    if (res.success) {
      setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
    setPassLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">My Profile</h1>
        <p className="text-dark-400 mt-2">Manage your educational details, credentials, and achievements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Avatar & Badges */}
        <div className="glass-card p-6 text-center space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={user?.avatar || generateAvatar(user?.name)}
              alt={user?.name}
              className="w-28 h-28 rounded-2xl object-cover border-2 border-primary-500/30 shadow-glow mb-4"
            />
            <h2 className="text-lg font-bold text-dark-100">{user?.name}</h2>
            <p className="text-xs text-dark-400 mt-0.5">{user?.email}</p>
          </div>

          <div className="border-t border-dark-700/30 pt-6">
            <h3 className="text-xs font-semibold text-dark-300 uppercase tracking-wider text-left mb-4">
              Achievements & Badges
            </h3>
            {user?.badges?.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {user.badges.map((bKey) => {
                  const badge = BADGE_DEFINITIONS[bKey] || { name: bKey, icon: '🏅', description: '' };
                  return (
                    <div
                      key={bKey}
                      className="p-2 rounded-xl bg-dark-850/60 border border-dark-800 flex flex-col items-center text-center group cursor-help relative"
                      title={badge.description}
                    >
                      <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                        {badge.icon}
                      </span>
                      <span className="text-[10px] font-semibold text-dark-300 truncate w-full">
                        {badge.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-dark-400 text-left">No badges earned yet. Solve challenges to unlock!</p>
            )}
          </div>
        </div>

        {/* Right Column: Profile Form & Change Password */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Form */}
          <div className="glass-card p-6">
            <h3 className="text-base font-semibold text-dark-100 mb-4 flex items-center gap-2">
              <HiOutlineAcademicCap className="w-5 h-5 text-primary-400" /> Education Details
            </h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="profile-name"
                  label="Full Name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  icon={HiOutlineUser}
                  required
                />
                <Input
                  id="profile-email"
                  label="Email (Cannot change)"
                  name="email"
                  value={user?.email || ''}
                  icon={HiOutlineMail}
                  disabled
                />
              </div>

              <Input
                id="profile-college"
                label="College / University"
                name="college"
                value={profileData.college}
                onChange={handleProfileChange}
                icon={HiOutlineAcademicCap}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="profile-branch"
                  label="Branch"
                  name="branch"
                  placeholder="e.g., CSE"
                  value={profileData.branch}
                  onChange={handleProfileChange}
                />
                <Input
                  id="profile-year"
                  label="Graduation Year"
                  type="number"
                  name="graduationYear"
                  value={profileData.graduationYear}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" loading={profileLoading} variant="primary">
                  Save Educational Info
                </Button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="glass-card p-6">
            <h3 className="text-base font-semibold text-dark-100 mb-4 flex items-center gap-2">
              <HiOutlineLockClosed className="w-5 h-5 text-accent-400" /> Security Settings
            </h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <Input
                id="profile-current-pass"
                label="Current Password"
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                value={passData.currentPassword}
                onChange={handlePassChange}
                icon={HiOutlineLockClosed}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="profile-new-pass"
                  label="New Password"
                  type="password"
                  name="newPassword"
                  placeholder="Min 6 characters"
                  value={passData.newPassword}
                  onChange={handlePassChange}
                  icon={HiOutlineLockClosed}
                  required
                />
                <Input
                  id="profile-confirm-pass"
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat new password"
                  value={passData.confirmPassword}
                  onChange={handlePassChange}
                  icon={HiOutlineLockClosed}
                  required
                />
              </div>

              <div className="pt-2">
                <Button type="submit" loading={passLoading} variant="primary">
                  Change Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
