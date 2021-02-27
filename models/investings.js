module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes
    return sequelize.define(
        'investings',
        {
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING, allowNull: false },
            value: { type: DataTypes.DOUBLE, allowNull: false },
            expectedReturn: { type: DataTypes.DOUBLE, allowNull: false },

        }
    )
}