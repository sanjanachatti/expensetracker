const Expense = require("../models/expense");
const Joi = require("joi");
const moment = require("moment");

const validateGetExpensePayload = (input) => {
  try {
    const schema = Joi.object().keys({
      // userid: Joi.string().required(),
      month: Joi.date().required(),
    });
    const result = schema.validate(input);
    console.log("result", result);
    if (result.error) {
      console.log(result.error);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
exports.getExpensesByMonth = async (req, res) => {
  try {
    const valid = validateGetExpensePayload(req.body);
    console.log("valid?", valid);
    if (!valid) {
      return res.status(200).send({ error: true, message: "Invalid Payload" });
    }
    const userid = req.user.userid;
    console.log("userid", userid);
    const monthStart = moment(req.body.month)
      .startOf("month")
      .format("YYYY-MM-DD");
    const monthEnd = moment(req.body.month).endOf("month").format("YYYY-MM-DD");
    console.log(monthStart, monthEnd);
    await Expense.find({
      $and: [
        { userid },
        { expense_date: { $gte: monthStart, $lte: monthEnd } },
      ],
      $sort: { expense_date: -1 },
    })
      .populate({
        path: "categoryid",
      })
      .then((doc) => {
        // console.log("Expense List", doc);
        return res
          .status(200)
          .send({ error: false, message: "Expense List", data: doc });
      })
      .catch((err) => {
        console.log("Expense fetch error", err);
        return res
          .status(500)
          .send({ error: true, message: "Expense fetch failed", err });
      });
  } catch (errcatch) {
    console.log("fetchExpense", errcatch);
    return res.status(500).send({
      error: true,
      message: "Expense fetch failed",
      err: errcatch,
      data: [],
    });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const userid = req.user.userid;
    let data = await Expense.find({ userid }).populate("categoryid").exec();
    data = data.map((expense) => ({
      amount: expense.amount,
      category: expense.categoryid.category_name,
      date: moment(expense.expense_date).format("DD/MM/YYYY"),
      expense_date: moment(expense.expense_date).format("YYYY-MM-DD"),
      notes: expense.notes,
      _id: expense._id,
    }));
    return res
      .status(200)
      .send({ error: false, message: "Expense List", data });
  } catch (error) {
    console.log("fetchExpense", error);
    return res.status(500).send({
      error: true,
      message: "expese fetch failed",
      err: error,
      data: [],
    });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const id = req.body.id;
    const expense = await Expense.findById(id).populate("categoryid").exec();
    const data = {
      amount: expense.amount,
      category: expense.categoryid.category_name,
      date: moment(expense.expense_date).format("DD/MM/YYYY"),
      expense_date: moment(expense.expense_date).format("YYYY-MM-DD"),
      notes: expense.notes,
      _id: expense._id,
      categoryId: expense.categoryid._id,
    };
    return res
      .status(200)
      .send({ error: false, message: "Expense List", data });
  } catch (error) {
    console.log("fetchExpense", error);
    return res.status(500).send({
      error: true,
      message: "expese fetch failed",
      err: error,
      data: [],
    });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const userid = req.user.userid;
    const expData = {
      userid,
      categoryid: req.body.categoryid,
      amount: req.body.amount,
      notes: req.body.notes ? req.body.notes : null,
      expense_date: moment(req.body.expense_date).format("YYYY-MM-DD"),
    };
    console.log("createExpense", expData);
    // to insert the record into mongodb
    const expense = new Expense(expData);
    await expense
      .save(expData)
      .then((doc) => {
        console.log("Expense created successfully", doc);
        return res
          .status(200)
          .send({ error: false, message: "Expense created" });
      })
      .catch((err) => {
        console.log("Expense add error", err);
        return res
          .status(500)
          .send({ error: true, message: "Expense Creation failed", err });
      });
  } catch (errcatch) {
    console.log("createExpense", errcatch);
    return res
      .status(500)
      .send({ error: true, message: "Expense Creation failed", err: errcatch });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    console.log("update expense details", req.body);
    await Expense.findOneAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
    })
      .then((doc) => {
        console.log("Expense details updated successfully", doc);
        return res
          .status(200)
          .send({ error: false, message: "Expense details updated" });
      })
      .catch((err) => {
        console.log("Expense update error", err);
        return res.status(500).send({
          error: true,
          message: "Expense details updation failed",
          err,
        });
      });
  } catch (errcatch) {
    console.log(errcatch);
    return res.status(500).send({
      error: true,
      message: "Expense details updation failed",
      err: errcatch,
    });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    console.log("delete Expense", req.body);
    await Expense.findOneAndDelete({ _id: req.body._id })
      .then((doc) => {
        console.log("Expense deleted successfully", doc);
        return res
          .status(200)
          .send({ error: false, message: "Expense deleted successfully" });
      })
      .catch((err) => {
        console.log("Expense delete error", err);
        return res.status(500).send({
          error: true,
          message: "Expense details updation failed",
          err,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: true,
      message: "Expense deletion failed",
      err: errcatch,
    });
  }
};
