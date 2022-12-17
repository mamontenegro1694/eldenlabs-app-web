import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Measurement } from 'src/app/models/measurement.interface';
import { MeasurementService } from 'src/app/services/measurement.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-measurements',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  rangeParams: { startDate: string, endDate: string } | null = null;

  measurementsDatasource: Measurement[] = []
  displayedColumns: string[] = [
    'ConnectionDeviceId',
    'EventProcessedUtcTime',
    'Hefesto_Id',
    'Timestamp',
    'VarName',
    'Value',
    'Plugin',
    'Request',
    'VarName1',
    'Device',
  ];

  constructor(
    private measurementService: MeasurementService,
  ) { }

  ngOnInit(): void {
    this.getAllMeasurements();
  }

  getAllMeasurements(): void {
    this.measurementService.getAll(
      this.rangeParams?.startDate,
      this.rangeParams?.endDate
    ).subscribe({
      next: (measurements) => {
        console.log(measurements);

        this.measurementsDatasource = measurements;
      }
    });
  }

  filter() {
    const startDate = this.start?.toISOString().split('T')[0];
    const endDate = this.end?.toISOString().split('T')[0];

    this.rangeParams = {
      startDate: startDate as string,
      endDate: endDate as string
    };

    this.getAllMeasurements();
  }

  clearFilter() {
    this.rangeParams = null;
    this.range.setValue({ start: null, end: null });
    this.getAllMeasurements();
  }

  get start() {
    return this.range.get("start")?.value;
  }

  get end() {
    return this.range.get("end")?.value;
  }
}
