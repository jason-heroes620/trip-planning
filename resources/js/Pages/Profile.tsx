import ProfileForm from '@/components/profile';
import UserLayout from '@/layout/UserLayout';

const Profile = ({ auth }: any) => {
    return (
        <UserLayout>
            <div className="px-4 py-4">
                <div>
                    <span>Profile</span>
                </div>
                <div>
                    <ProfileForm auth={auth} />
                </div>
            </div>
        </UserLayout>
    );
};

export default Profile;
