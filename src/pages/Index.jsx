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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const recordingsData = [
  { id: "1", name: "Recording 1", date: "2023-10-01", duration: "3:45", analysed: false },
  { id: "2", name: "Recording 2", date: "2023-10-02", duration: "2:30", analysed: false },
  { id: "3", name: "Recording 3", date: "2023-10-03", duration: "4:15", analysed: false },
];

function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [recordings, setRecordings] = useState(recordingsData);

  const filteredRecordings = recordings
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
      } else if (sortField === "analysed") {
        return a.analysed === b.analysed ? 0 : a.analysed ? -1 : 1;
      }
      return 0;
    });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(recordings);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRecordings(items);
  };

  const toggleAnalyse = (id) => {
    setRecordings((prevRecordings) =>
      prevRecordings.map((recording) =>
        recording.id === id ? { ...recording, analysed: !recording.analysed } : recording
      )
    );
  };

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
            <SelectItem value="analysed">Analysed</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setSearchTerm("")}>Clear</Button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="recordings">
          {(provided) => (
            <Table {...provided.droppableProps} ref={provided.innerRef}>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecordings.map((recording, index) => (
                  <Draggable key={recording.id} draggableId={recording.id} index={index}>
                    {(provided) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TableCell>{recording.name}</TableCell>
                        <TableCell>{recording.date}</TableCell>
                        <TableCell>{recording.duration}</TableCell>
                        <TableCell>{recording.analysed ? "Analysed" : "Not Analysed"}</TableCell>
                        <TableCell>
                          {recording.analysed ? (
                            <Button disabled>Analysed</Button>
                          ) : (
                            <Button onClick={() => toggleAnalyse(recording.id)}>
                              Analyse
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Index;