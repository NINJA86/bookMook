import { Dialect, Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize(
  process.env.SQL_DATABASE!,
  process.env.SQL_USERNAME!,
  process.env.SQL_PASSWORD!,

  {
  host:  process.env.SQL_HOST!,
  dialect: process.env.SQL_DIALECT! as Dialect,
  }
);

export const connectToDb = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    console.log('db connected successfully!')
    
  } catch (error) {
    console.log("err occured during connecting to db", error)
    
    process.exit(1)
  }
}


export default sequelize