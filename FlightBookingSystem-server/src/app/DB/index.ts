import config from '../config';
import { USER_ROLE } from '../modules/auth/auth.const';
import { UserModel } from '../modules/auth/auth.model';

const superUser = {
  name: 'admin',
  email: 'admin@gmail.com',
  password: config.admin_password,
  phone: '+8801624028821',
  role: USER_ROLE.ADMIN,
  address: 'Dhaka Bangladesh',
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await UserModel.findOne({ role: USER_ROLE.ADMIN });

  if (!isSuperAdminExits) {
    await UserModel.create(superUser);
  }
};

export default seedSuperAdmin;
