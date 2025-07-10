module.exports = function checkRole(user, role) {
  if (!user) return false;
  if (role === 'admin') return !!user.isAdmin;
  // Boshqa rollar uchun ham qo'shish mumkin
  return false;
};
