const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Create Company (Step 1 - Draft)

router.post("/", async (req, res) => {
  try {
    const { name, numberOfShareholders, totalCapital } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Company name is required" });
    }

    if (!numberOfShareholders || numberOfShareholders <= 0) {
      return res
        .status(400)
        .json({ error: "Number of shareholders must be greater than 0" });
    }

    if (!totalCapital || totalCapital <= 0) {
      return res
        .status(400)
        .json({ error: "Total capital must be greater than 0" });
    }

    const company = await prisma.company.create({
      data: {
        name: name.trim(),
        numberOfShareholders: Number(numberOfShareholders),
        totalCapital: Number(totalCapital),
        status: "DRAFT",
      },
    });

    return res.status(201).json(company);
  } catch (error) {
    // 🔥 Handle duplicate company name
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Company with this name already exists",
      });
    }

    console.error("Create Company Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get Company By ID

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const company = await prisma.company.findUnique({
      where: { id: Number(id) },
      include: { shareholders: true },
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    return res.json(company);
  } catch (error) {
    console.error("Get Company Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update Company Draft

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, numberOfShareholders, totalCapital } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Company name is required" });
    }

    if (!numberOfShareholders || numberOfShareholders <= 0) {
      return res
        .status(400)
        .json({ error: "Number of shareholders must be greater than 0" });
    }

    if (!totalCapital || totalCapital <= 0) {
      return res
        .status(400)
        .json({ error: "Total capital must be greater than 0" });
    }

    const updatedCompany = await prisma.company.update({
      where: { id: Number(id) },
      data: {
        name: name.trim(),
        numberOfShareholders: Number(numberOfShareholders),
        totalCapital: Number(totalCapital),
      },
    });

    return res.json(updatedCompany);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Company with this name already exists",
      });
    }

    console.error("Update Company Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update Company Status

router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const updatedCompany = await prisma.company.update({
      where: { id: Number(id) },
      data: { status },
    });

    return res.json(updatedCompany);
  } catch (error) {
    console.error("Update Status Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//Get All Companies (Admin View)

router.get("/", async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        shareholders: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(companies);
  } catch (error) {
    console.error("Get All Companies Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
