import { Model, Column, DataType, Table } from "sequelize-typescript";

export interface UserCreationAttrs {
    name: string;
    surname: string;
    email: string;
    password: string;
}

@Table({ tableName: "user" })
export class User extends Model<User, UserCreationAttrs> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    surname: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: "USER"})
    role: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    groups: number;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    ban: boolean;

    @Column({ type: DataType.STRING, allowNull: true })
    reasonBan: string;
}