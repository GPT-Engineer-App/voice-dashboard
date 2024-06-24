import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const recordingsData = [
  { name: "Recording 1", date: "2023-10-01", duration: "3:45" },
  { name: "Recording 2", date: "2023-10-02", duration: "2:30" },
  { name: "Recording 3", date: "2023-10-03", duration: "4:15" },
];

function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");

  const filteredRecordings = recordingsData
    .filter((recording) =>
      recording.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortField === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortField === "duration") {
        return (
          parseInt(a.duration.split(":")[0]) * 60 +
          parseInt(a.duration.split(":")[1]) -
          (parseInt(b.duration.split(":")[0]) * 60 +
            parseInt(b.duration.split(":")[1]))
        );
      }
      return 0;
    });

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search recordings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select onValueChange={(value) => setSortField(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="duration">Duration</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setSearchTerm("")}>Clear</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecordings.map((recording, index) => (
            <TableRow key={index}>
              <TableCell>{recording.name}</TableCell>
              <TableCell>{recording.date}</TableCell>
              <TableCell>{recording.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Index;