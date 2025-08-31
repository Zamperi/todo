import {pool} from '../helper/db.js';

const selectAllTasks = async() => {
    return await pool.query("SELECT * FROM tasks");
};

const insertTask = async(description) => {
    return await pool.query("INSERT INTO tasks (description) VALUES ($1) RETURNING *", 
        [description]);
};

const removeTask = async(id) => {
    return await pool.query("DELETE FROM tasks WHERE id=$1",
        [id]);
}

export {selectAllTasks, insertTask, removeTask}