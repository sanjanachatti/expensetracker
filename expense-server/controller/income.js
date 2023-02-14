const Income = require("../models/income");
const Joi = require("joi");
const moment = require("moment");

const validateGetIncomePayload = (input) => {
  try {
    const schema = Joi.object().keys({
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
exports.getIncomeByMonth = async (req, res) => {
  try {
    const valid = validateGetIncomePayload(req.body);
    console.log("valid?", valid);
    if (!valid) {
      return res.status(200).send({ error: true, message: "Invalid Payload" });
    }
    const userid = req.user.userid;
    const monthStart = moment(req.body.month)
      .startOf("month")
      .format("YYYY-MM-DD");
    const monthEnd = moment(req.body.month).endOf("month").format("YYYY-MM-DD");
    console.log(monthStart, monthEnd);
    await Income.find({
      $and: [{ userid }, { income_date: { $gte: monthStart, $lte: monthEnd } }],
      $sort: { income_date: -1 },
    })
      .populate({
        path: "categoryid",
      })
      .then((doc) => {
        console.log("Income List", doc);
        return res
          .status(200)
          .send({ error: false, message: "Income List", data: doc });
      })
      .catch((err) => {
        console.log("Income fetch error", err);
        return res
          .status(500)
          .send({ error: true, message: "Income fetch failed", err });
      });
  } catch (errcatch) {
    console.log("fetchIncome", errcatch);
    return res.status(500).send({
      error: true,
      message: "Income fetch failed",
      err: errcatch,
      data: [],
    });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const userid = req.user.userid;
    let data = await Income.find({ userid }).populate("categoryid").exec();
    data = data.map((income) => ({
      amount: income.amount,
      category: income.categoryid.category_name,
      date: moment(income.income_date).format("DD/MM/YYYY"),
      income_date: moment(income.income_date).format("YYYY-MM-DD"),
      notes: income.notes,
      _id: income._id,
    }));
    return res.status(200).send({ error: false, message: "Income List", data });
  } catch (error) {
    console.log("fetchIncome", error);
    return res.status(500).send({
      error: true,
      message: "Income fetch failed",
      err: error,
      data: [],
    });
  }
};

exports.getIncomeById = async (req, res) => {
  try {
    const id = req.body.id;
    const income = await Income.findById(id).populate("categoryid").exec();
    const data = {
      amount: income.amount,
      category: income.categoryid.category_name,
      date: moment(income.income_date).format("DD/MM/YYYY"),
      income_date: moment(income.income_date).format("YYYY-MM-DD"),
      notes: income.notes,
      _id: income._id,
      categoryId: income.categoryid._id,
    };
    return res.status(200).send({ error: false, message: "Income List", data });
  } catch (error) {
    console.log("fetchIncome", error);
    return res.status(500).send({
      error: true,
      message: "Income fetch failed",
      err: error,
      data: [],
    });
  }
};

exports.createIncome = async (req, res) => {
  try {
    const userid = req.user.userid;
    const incomeData = {
      userid,
      categoryid: req.body.categoryid,
      amount: req.body.amount,
      notes: req.body.notes ? req.body.notes : null,
      income_date: moment(req.body.income_date).format("YYYY-MM-DD"),
    };
    console.log("createIncome", incomeData);
    // to insert the record into mongodb
    const income = new Income(incomeData);
    await income
      .save(incomeData)
      .then((doc) => {
        console.log("Income created successfully", doc);
        return res
          .status(200)
          .send({ error: false, message: "Income created" });
      })
      .catch((err) => {
        console.log("Income add error", err);
        return res
          .status(500)
          .send({ error: true, message: "Income Creation failed", err });
      });
  } catch (errcatch) {
    console.log("createIncome", errcatch);
    return res
      .status(500)
      .send({ error: true, message: "Income Creation failed", err: errcatch });
  }
};

exports.updateIncome = async (req, res) => {
  try {
    console.log("update Income details", req.body);
    await Income.findOneAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
    })
      .then((doc) => {
        console.log("Income details updated successfully", doc);
        return res
          .status(200)
          .send({ error: false, message: "Income details updated" });
      })
      .catch((err) => {
        console.log("Income update error", err);
        return res.status(500).send({
          error: true,
          message: "Income details updation failed",
          err,
        });
      });
  } catch (errcatch) {
    console.log(errcatch);
    return res.status(500).send({
      error: true,
      message: "Income details updation failed",
      err: errcatch,
    });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    console.log("delete Income", req.body);
    await Income.findOneAndDelete({ _id: req.body._id })
      .then((doc) => {
        console.log("Income deleted successfully", doc);
        return res
          .status(200)
          .send({ error: false, message: "Income deleted successfully" });
      })
      .catch((err) => {
        console.log("Income delete error", err);
        return res.status(500).send({
          error: true,
          message: "Income details updation failed",
          err,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: true,
      message: "Income deletion failed",
      err: errcatch,
    });
  }
};
