const Expense = require("../models/expense");
const Income = require("../models/income");
const Joi = require("joi");
const moment = require("moment");

const validatePayload = (input) => {
  try {
    const schema = Joi.object().keys({
      // userid: Joi.string().required(),
      month: Joi.date().required()
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
exports.getDashboardDataByMonth = async (req, res) => {
  try {
    console.log("-------");
    const valid = validatePayload(req.body);
    console.log("valid?", valid);
    const userid = req.user.userid;
    if (!valid) {
      return res
        .status(200)
        .send({ error: true, message: "Invalid Payload", data: [] });
    }
    let total_expenses = 0;
    let total_income = 0;
    const monthStart = moment(req.body.month)
      .startOf("month")
      .format("YYYY-MM-DD");
    const monthEnd = moment(req.body.month).endOf("month").format("YYYY-MM-DD");
    console.log(monthStart, monthEnd);
    const returnData = {};
    await Expense.find({
      $and: [{ userid }, { expense_date: { $gte: monthStart, $lte: monthEnd } }]
    })
      .populate({
        path: "categoryid"
      })
      .then((expense) => {
        console.log("Expense List", expense);
        expense.forEach((ee) => {
          total_expenses += ee.amount ? ee.amount : 0;
        });
        returnData.Expenses = expense;
      })
      .catch((err) => {
        console.log("Expense fetch error", err);
        return res.status(500).send({
          error: true,
          message: "Expense fetch failed",
          err,
          data: []
        });
      });
    await Income.find({
      $and: [{ userid }, { income_date: { $gte: monthStart, $lte: monthEnd } }]
    })
      .populate({
        path: "categoryid"
      })
      .then((incomes) => {
        console.log("Income List", incomes);
        incomes.forEach((ee) => {
          total_income += ee.amount ? ee.amount : 0;
        });
        returnData.Incomes = incomes;
      })
      .catch((err) => {
        console.log("Income fetch error", err);
        return res.status(500).send({
          error: true,
          message: "Income fetch failed",
          err,
          data: []
        });
      });
    console.log(
      "returndata of exp and incomes",
      returnData,
      total_expenses,
      total_income
    );
    returnData.total_expenses = total_expenses;
    returnData.total_income = total_income;
    returnData.net = total_income - total_expenses;
    return res.status(200).send({
      error: false,
      message: "Dashboard fetched Details",
      data: returnData
    });
  } catch (errcatch) {
    console.log("fetchExpenseIncomes", errcatch);
    return res.status(500).send({
      error: true,
      message: "Dashboard fetch failed",
      err: errcatch,
      data: []
    });
  }
};

exports.getGraphData = async (req, res) => {
  try {
    const userid = req.user.userid;
    const monthStart = moment()
      .startOf("month")
      .add(-2, "month")
      .format("YYYY-MM-DD");
    const monthEnd = moment()
      .endOf("month")
      .add(2, "month")
      .format("YYYY-MM-DD");
    console.log(monthStart, monthEnd);
    let exps = [];
    let incs = [];
    await Expense.find({
      $and: [{ userid }, { expense_date: { $gte: monthStart, $lte: monthEnd } }]
    })
      .then((expense) => {
        exps = expense;
      })
      .catch((err) => {
        console.log("Expense fetch error", err);
        return res.status(500).send({
          error: true,
          message: "Expense fetch failed",
          err,
          data: []
        });
      });
    await Income.find({
      $and: [{ userid }, { income_date: { $gte: monthStart, $lte: monthEnd } }]
    })
      .then((incomes) => {
        incs = incomes;
      })
      .catch((err) => {
        console.log("Income fetch error", err);
        return res.status(500).send({
          error: true,
          message: "Income fetch failed",
          err,
          data: []
        });
      });

    const x = [];
    const y = [
      {
        name: "Income",
        data: [0, 0, 0, 0, 0]
      },
      {
        name: "Expense",
        data: [0, 0, 0, 0, 0]
      }
    ];

    for (let i = -2; i <= 2; i++) {
      const index = i + 2;
      let currExpense = 0;
      let currIncome = 0;
      x.push(moment().add(i, "month").format("MMM YYYY"));
      const monthStart = moment()
        .startOf("month")
        .add(i, "month")
        .format("YYYY-MM-DD");
      const monthEnd = moment()
        .endOf("month")
        .add(i, "month")
        .format("YYYY-MM-DD");
      console.log(monthStart, monthEnd);
      exps.forEach((expense) => {
        const expense_date = moment(expense.expense_date).format("YYYY-MM-DD");
        if (expense_date >= monthStart && expense_date <= monthEnd) {
          currExpense += expense.amount;
        }
      });
      incs.forEach((income) => {
        const income_date = moment(income.income_date).format("YYYY-MM-DD");
        if (income_date >= monthStart && income_date <= monthEnd) {
          currIncome += income.amount;
        }
      });
      y[0].data[index] = currIncome;
      y[1].data[index] = currExpense;
    }
    console.log(exps, x, y);

    return res.status(200).send({
      error: false,
      message: "Graph fetched Details",
      data: { x, y }
    });
  } catch (errcatch) {
    console.log("fetchExpenseIncomes", errcatch);
    return res.status(500).send({
      error: true,
      message: "Graph fetch failed",
      err: errcatch,
      data: { x: [], y: [] }
    });
  }
};
