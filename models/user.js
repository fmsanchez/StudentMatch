module.exports = function(sequelize, Sequelize) {
	var User = sequelize.define('User', {
	  id: {
	    type: Sequelize.INTEGER,
	    autoIncrement: true,
	    primaryKey: true
	  },
	  name: Sequelize.STRING,
	  image: Sequelize.STRING,
	  gender: Sequelize.STRING,
	  facebook_access_token: Sequelize.STRING,
	  display_name: Sequelize.STRING,
	  registered: Sequelize.BOOLEAN,
	  facebook_id: Sequelize.INTEGER,
	  email: Sequelize.STRING,
	  encrypted_password: Sequelize.STRING,
	  reset_password_token: Sequelize.STRING,
	  reset_password_sent_at: Sequelize.DATE,
	  sign_in_count: { type: Sequelize.INTEGER, defaultValue: 0 },
	  failed_attempts: Sequelize.INTEGER,
	}, {
	  timestamps: true,
	  freezeTableName: true
	});

	return User;
};