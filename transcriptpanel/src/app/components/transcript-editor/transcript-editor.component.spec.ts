import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptEditorComponent } from './transcript-editor.component';

describe('TranscriptEditorComponent', () => {
  let component: TranscriptEditorComponent;
  let fixture: ComponentFixture<TranscriptEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscriptEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
