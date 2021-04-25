import { Routes } from '@angular/router';

import { LabelComponent } from '../../pages/label/label.component'
import { GroupsComponent } from '../../pages/groups/groups.component';
import { StudentComponent } from '../../pages/students/student.component';
import {StudentProfileComponent} from '../../pages/student-profile/student-profile.component'
import { ProblemasComponent } from '../../pages/problemas/problemas.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'labels',      component: LabelComponent },
    { path: 'student-profile',   component: StudentProfileComponent },
    { path: 'problemas',         component: ProblemasComponent },
    { path: 'groups',          component: GroupsComponent },
    { path: 'students',           component: StudentComponent }
];
