import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  AlertCircle,
  Database,
  Users,
  TrendingUp,
} from "lucide-react";

interface LeadRecord {
  recordId: string;
  fields: {
    Date?: string;
    Name?: string;
    "Lead Quality"?: string;
    "Lead Score"?: number;
    Suggestion?: string;
  };
}

interface ApiResponse {
  data?: {
    records?: LeadRecord[];
  };
}

export default function Index() {
  const [date, setDate] = useState("");
  const [accountId, setAccountId] = useState("");
  const [records, setRecords] = useState<LeadRecord[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!date) {
      setError("Please select a date before searching.");
      return;
    }

    if (!accountId) {
      setError("Please enter an Account ID before searching.");
      return;
    }

    setLoading(true);
    setError("");
    setRecords([]);

    try {
      // Convert date input to ISO format (YYYY-MM-DD)
      const formattedDate = new Date(date).toISOString().split("T")[0];

      const response = await axios.get<ApiResponse>(
        `https://aitable.ai/fusion/v1/datasheets/${import.meta.env.VITE_AI_TABLE_ID}/records?filter=date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AI_API_TOKEN}`,
          },
        },
      );

      let result = response.data?.data?.records || [];

      // Filter out blank rows
      result = result.filter((record) => {
        const f = record.fields;
        return (
          f.Date ||
          f.Name ||
          f["Lead Quality"] ||
          f["Lead Score"] ||
          f.Suggestion
        );
      });

      // Filter by Account ID if provided
      if (accountId) {
        result = result.filter((record) => {
          const f = record.fields;
          // Check if Account ID matches (case insensitive)
          return (
            f["Account ID"]?.toString().toLowerCase() ===
              accountId.toLowerCase() ||
            f["AccountID"]?.toString().toLowerCase() ===
              accountId.toLowerCase() ||
            f["Account_ID"]?.toString().toLowerCase() ===
              accountId.toLowerCase()
          );
        });
      }

      if (result.length > 0) {
        setRecords(result);
      } else {
        setError(
          "No leads found for the selected date and Account ID combination.",
        );
      }
    } catch (err: any) {
      console.error("Error fetching data:", err);
      if (err.response?.status === 429) {
        setError("Rate limit exceeded. Please wait a moment and try again.");
      } else if (err.response?.status === 404) {
        setError("Invalid request. Check your table ID or field name.");
      } else {
        setError(
          "Something went wrong. Please check your setup and try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const getQualityBadgeStyle = (quality: string) => {
    switch (quality?.toLowerCase()) {
      case "high":
      case "excellent":
        return {
          backgroundColor: "rgba(239, 99, 29, 0.2)",
          color: "#ef631d",
          borderColor: "rgba(239, 99, 29, 0.5)",
        };
      case "medium":
      case "good":
        return {
          backgroundColor: "rgba(239, 99, 29, 0.15)",
          color: "#ef631d",
          borderColor: "rgba(239, 99, 29, 0.4)",
        };
      case "low":
      case "poor":
        return {
          backgroundColor: "rgba(239, 99, 29, 0.1)",
          color: "#ef631d",
          borderColor: "rgba(239, 99, 29, 0.3)",
        };
      default:
        return {
          backgroundColor: "rgba(239, 99, 29, 0.05)",
          color: "#ef631d",
          borderColor: "rgba(239, 99, 29, 0.2)",
        };
    }
  };

  const getScoreBadgeStyle = (score: number) => {
    if (score >= 80)
      return {
        backgroundColor: "rgba(239, 99, 29, 0.2)",
        color: "#ef631d",
        borderColor: "rgba(239, 99, 29, 0.5)",
      };
    if (score >= 60)
      return {
        backgroundColor: "rgba(239, 99, 29, 0.15)",
        color: "#ef631d",
        borderColor: "rgba(239, 99, 29, 0.4)",
      };
    if (score >= 40)
      return {
        backgroundColor: "rgba(239, 99, 29, 0.1)",
        color: "#ef631d",
        borderColor: "rgba(239, 99, 29, 0.3)",
      };
    return {
      backgroundColor: "rgba(239, 99, 29, 0.05)",
      color: "#ef631d",
      borderColor: "rgba(239, 99, 29, 0.2)",
    };
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return "#ef631d";
    if (score >= 60) return "rgba(239, 99, 29, 0.8)";
    if (score >= 40) return "rgba(239, 99, 29, 0.6)";
    return "rgba(239, 99, 29, 0.4)";
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: "rgba(239, 99, 29, 0.1)" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: "rgba(239, 99, 29, 0.08)",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: "rgba(239, 99, 29, 0.05)",
            animationDelay: "2s",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-lg opacity-50 animate-pulse"
                style={{ backgroundColor: "#ef631d" }}
              ></div>
              <div
                className="relative rounded-full border backdrop-blur-sm mr-6 h-20 w-20 overflow-hidden"
                style={{
                  backgroundColor: "rgba(239, 99, 29, 0.2)",
                  borderColor: "rgba(239, 99, 29, 0.3)",
                }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F81bccd5a41bc4ed38b37d0c984ca8f24%2F921dc591ce5f48878026af10318b802b?format=webp&width=800"
                  alt="The Wise Parrot Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <h1
              className="text-6xl font-bold animate-pulse"
              style={{ color: "#ef631d" }}
            >
              The Wise Parrot
            </h1>
          </div>
          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "#ef631d" }}
          >
            Search and analyze leads by date to discover insights and track
            performance metrics with AI-powered intelligence
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-2xl blur-xl"
              style={{ backgroundColor: "rgba(239, 99, 29, 0.2)" }}
            ></div>
            <Card
              className="relative border bg-white/90 backdrop-blur-xl shadow-2xl"
              style={{ borderColor: "rgba(239, 99, 29, 0.3)" }}
            >
              <CardHeader className="text-center pb-2">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                  <div className="relative">
                    <Calendar
                      className="h-6 w-6"
                      style={{ color: "#ef631d" }}
                    />
                    <div
                      className="absolute inset-0 h-6 w-6 rounded blur-sm opacity-50"
                      style={{ backgroundColor: "#ef631d" }}
                    ></div>
                  </div>
                  <span style={{ color: "#ef631d" }}>Date Search</span>
                </CardTitle>
                <CardDescription
                  className="text-lg"
                  style={{ color: "#ef631d" }}
                >
                  Select a date to view all leads created on that day
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#ef631d" }}
                      >
                        Select Date
                      </label>
                      <div className="relative">
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="h-14 text-lg bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-200"
                          style={{
                            color: "#ef631d",
                            borderColor: "rgba(239, 99, 29, 0.3)",
                          }}
                          placeholder="Select date"
                        />
                        <div
                          className="absolute inset-0 rounded-md pointer-events-none"
                          style={{ backgroundColor: "rgba(239, 99, 29, 0.1)" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#ef631d" }}
                      >
                        Account ID
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          value={accountId}
                          onChange={(e) => setAccountId(e.target.value)}
                          className="h-14 text-lg bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-200"
                          style={{
                            color: "#ef631d",
                            borderColor: "rgba(239, 99, 29, 0.3)",
                          }}
                          placeholder="Enter Account ID"
                        />
                        <div
                          className="absolute inset-0 rounded-md pointer-events-none"
                          style={{ backgroundColor: "rgba(239, 99, 29, 0.1)" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onClick={handleSearch}
                      disabled={loading}
                      size="lg"
                      className="h-14 px-10 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                      style={{ backgroundColor: "#ef631d" }}
                    >
                      <Search className="h-5 w-5 mr-3" />
                      {loading ? (
                        <span className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Searching...
                        </span>
                      ) : (
                        "Search Leads"
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert
                    className="backdrop-blur-sm"
                    style={{
                      borderColor: "rgba(239, 99, 29, 0.5)",
                      backgroundColor: "rgba(239, 99, 29, 0.1)",
                    }}
                  >
                    <AlertCircle
                      className="h-5 w-5"
                      style={{ color: "#ef631d" }}
                    />
                    <AlertDescription
                      className="font-medium"
                      style={{ color: "#ef631d" }}
                    >
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section */}
        {records.length > 0 && (
          <div className="relative mb-12">
            <div
              className="absolute inset-0 rounded-2xl blur-xl"
              style={{ backgroundColor: "rgba(239, 99, 29, 0.2)" }}
            ></div>
            <Card
              className="relative border bg-white/90 backdrop-blur-xl shadow-2xl"
              style={{ borderColor: "rgba(239, 99, 29, 0.3)" }}
            >
              <CardHeader
                className="border-b"
                style={{ borderBottomColor: "rgba(239, 99, 29, 0.2)" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="relative">
                        <Users
                          className="h-6 w-6"
                          style={{ color: "#ef631d" }}
                        />
                        <div
                          className="absolute inset-0 h-6 w-6 rounded blur-sm opacity-50"
                          style={{ backgroundColor: "#ef631d" }}
                        ></div>
                      </div>
                      <span style={{ color: "#ef631d" }}>Lead Results</span>
                    </CardTitle>
                    <CardDescription
                      className="text-lg"
                      style={{ color: "#ef631d" }}
                    >
                      Found {records.length} lead
                      {records.length !== 1 ? "s" : ""} for the selected date
                    </CardDescription>
                  </div>
                  <div
                    className="flex items-center gap-3 px-4 py-2 rounded-full border"
                    style={{
                      backgroundColor: "rgba(239, 99, 29, 0.2)",
                      borderColor: "rgba(239, 99, 29, 0.3)",
                    }}
                  >
                    <TrendingUp
                      className="h-5 w-5"
                      style={{ color: "#ef631d" }}
                    />
                    <span className="font-medium" style={{ color: "#ef631d" }}>
                      Real-time data
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow
                        className="border-b hover:bg-orange-50"
                        style={{
                          backgroundColor: "rgba(239, 99, 29, 0.1)",
                          borderBottomColor: "rgba(239, 99, 29, 0.2)",
                        }}
                      >
                        <TableHead
                          className="font-bold text-base"
                          style={{ color: "#ef631d" }}
                        >
                          Date
                        </TableHead>
                        <TableHead
                          className="font-bold text-base"
                          style={{ color: "#ef631d" }}
                        >
                          Name
                        </TableHead>
                        <TableHead
                          className="font-bold text-base"
                          style={{ color: "#ef631d" }}
                        >
                          Quality
                        </TableHead>
                        <TableHead
                          className="font-bold text-base"
                          style={{ color: "#ef631d" }}
                        >
                          Score
                        </TableHead>
                        <TableHead
                          className="font-bold text-base"
                          style={{ color: "#ef631d" }}
                        >
                          Suggestion
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {records.map((record, index) => {
                        const f = record.fields;
                        return (
                          <TableRow
                            key={record.recordId || index}
                            className="border-b transition-all duration-300 hover:bg-orange-25"
                            style={{
                              borderBottomColor: "rgba(239, 99, 29, 0.1)",
                            }}
                          >
                            <TableCell
                              className="font-medium"
                              style={{ color: "#ef631d" }}
                            >
                              {f.Date
                                ? new Date(f.Date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "—"}
                            </TableCell>
                            <TableCell className="font-medium">
                              <span
                                className="px-2 py-1 rounded-md border"
                                style={{
                                  color: "#ef631d",
                                  backgroundColor: "rgba(239, 99, 29, 0.1)",
                                  borderColor: "rgba(239, 99, 29, 0.3)",
                                }}
                              >
                                {f.Name || "—"}
                              </span>
                            </TableCell>
                            <TableCell>
                              {f["Lead Quality"] ? (
                                <Badge
                                  className="px-3 py-1 font-bold border shadow-lg"
                                  style={getQualityBadgeStyle(
                                    f["Lead Quality"],
                                  )}
                                >
                                  {f["Lead Quality"]}
                                </Badge>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {f["Lead Score"] !== undefined ? (
                                <div className="flex items-center gap-3">
                                  <Badge
                                    className="px-3 py-1 font-bold border shadow-lg"
                                    style={getScoreBadgeStyle(f["Lead Score"])}
                                  >
                                    {f["Lead Score"]}
                                  </Badge>
                                  <div className="w-20 bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                      className="h-3 rounded-full transition-all duration-500 shadow-lg"
                                      style={{
                                        width: `${Math.min(f["Lead Score"], 100)}%`,
                                        backgroundColor: getScoreBarColor(
                                          f["Lead Score"],
                                        ),
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <div
                                className="text-sm truncate transition-colors cursor-help"
                                style={{ color: "#ef631d" }}
                                title={f.Suggestion}
                              >
                                {f.Suggestion || "—"}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats Cards */}
        {records.length > 0 && (
          <div className="flex justify-center mt-12">
            {/* Total Leads Card */}
            <div className="relative group max-w-sm">
              <div
                className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"
                style={{ backgroundColor: "rgba(239, 99, 29, 0.2)" }}
              ></div>
              <Card
                className="relative text-center border bg-white/90 backdrop-blur-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-3xl"
                style={{ borderColor: "rgba(239, 99, 29, 0.3)" }}
              >
                <CardContent className="pt-8 pb-6">
                  <div
                    className="text-5xl font-bold mb-3 animate-pulse"
                    style={{ color: "#ef631d" }}
                  >
                    {records.length}
                  </div>
                  <div
                    className="font-semibold text-lg"
                    style={{ color: "#ef631d" }}
                  >
                    Total Leads
                  </div>
                  <div
                    className="mt-2 text-sm"
                    style={{ color: "#ef631d", opacity: 0.7 }}
                  >
                    Discovered today
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
