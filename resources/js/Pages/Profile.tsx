import ProfileForm from '@/components/profile';
import UserLayout from '@/layout/UserLayout';

const Profile = ({ auth }: any) => {
    return (
        <UserLayout>
            <div className="px-6 py-4 md:px-10 lg:px-20 xl:px-32">
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
