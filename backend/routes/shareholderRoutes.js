const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * ======================================
 * Add Shareholders (Step 2 - Complete)
 * ======================================
 */
router.post("/", async (req, res) => {
  try {
    const { companyId, shareholders } = req.body;

    // 🔥 Basic Validation
    if (!companyId) {
      return res.status(400).json({ error: "Company ID is required" });
    }

    if (!Array.isArray(shareholders) || shareholders.length === 0) {
      return res.status(400).json({ error: "Shareholders array is required" });
    }

    // 🔥 Check if company exists
    const company = await prisma.company.findUnique({
      where: { id: Number(companyId) },
      include: { shareholders: true },
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // 🔥 Prevent duplicate submission
    if (company.shareholders.length > 0) {
      return res.status(400).json({
        error: "Shareholders already added for this company",
      });
    }

    // 🔥 Validate shareholder count
    if (shareholders.length !== company.numberOfShareholders) {
      return res.status(400).json({
        error: `Expected ${company.numberOfShareholders} shareholders`,
      });
    }

    // 🔥 Validate each shareholder
    for (const sh of shareholders) {
      if (!sh.firstName || !sh.lastName || !sh.nationality) {
        return res.status(400).json({
          error: "All shareholder fields are required",
        });
      }
    }

    // 🔥 Transaction (Atomic Operation)
    const createdShareholders = await prisma.$transaction(
      shareholders.map((sh) =>
        prisma.shareholder.create({
          data: {
            firstName: sh.firstName.trim(),
            lastName: sh.lastName.trim(),
            nationality: sh.nationality.trim(),
            companyId: Number(companyId),
          },
        }),
      ),
    );

    // 🔥 Update Company Status
    await prisma.company.update({
      where: { id: Number(companyId) },
      data: { status: "COMPLETED" },
    });

    return res.status(201).json({
      message: "Shareholders added successfully",
      data: createdShareholders,
    });
  } catch (error) {
    console.error("Add Shareholders Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
