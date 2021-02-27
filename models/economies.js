module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes
    return sequelize.define(
        'economies',
        {
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING, allowNull: false },
            value: { type: DataTypes.DOUBLE, allowNull: false },
            isIncome: { type: DataTypes.BOOLEAN, allowNull: false },

        }
    )
}