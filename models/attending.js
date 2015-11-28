module.exports = function(sequelize, Sequelize) {
	var Attending = sequelize.define('Attending', {
	  id: {
	    type: Sequelize.INTEGER,
	    autoIncrement: true,
	    primaryKey: true
	  },
	  user_id: {
	    type: Sequelize.INTEGER,
	    references: {
	      model: 'User',
	      key: 'id',
	      //defferable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	    }
	  },
	  event_id: {
	    type: Sequelize.INTEGER,
	    references: {
	      model: 'Event',
	      key: 'id',
	      //defferable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	    }
	  }
	}, {
	  timestamps: true,
	  freezeTableName: true
	});

	return Attending;
};