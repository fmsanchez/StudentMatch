module.exports = function(sequelize, Sequelize) {
	var Event = sequelize.define('Event', {
	  id: {
	    type: Sequelize.INTEGER,
	    autoIncrement: true,
	    primaryKey: true
	  },
	  name: Sequelize.STRING,
	  description: Sequelize.TEXT,
	  category: Sequelize.STRING,
	  location: Sequelize.STRING,
	  geolocation: Sequelize.STRING,
	  capacity: Sequelize.INTEGER,
	  attending: { type: Sequelize.INTEGER, defaultValue: 0 },
	  created_by: {
	    type: Sequelize.INTEGER,
	    references: {
	      model: 'User',
	      key: 'id',
	      //defferable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	    }
	  },
	  startdate: Sequelize.DATE,
	  enddate: Sequelize.DATE,
	  duration: Sequelize.INTEGER
	}, {
	  timestamps: true,
	  freezeTableName: true
	});

	return Event;
};