angular.module("jobSearch").controller("JobSearchController",JobSearchController);

function JobSearchController(JobSearchDataFactory,$location){
    const vm = this;
    vm.title = "Job Opening : ";
    JobSearchDataFactory.getAllJobs().then(function(response){
        vm.jobs = response;
    });
  vm.addNewJob = function(){
        const newJob = {
            title: vm.newJobTitle,
            salary: vm.newJobSalary,
            description: vm.newJobDescription,
            experience: vm.newJobExperience,
            skills: vm.newJobSkills,
            postDate : vm.newPostDate,
            street : vm.newJobStreet,
            zipCode : vm.newJobzipCode
        };
        if(vm.jobForm.$valid){
            JobSearchDataFactory.addNewJob(newJob).then(function(response){
                console.log("Job saved...");
                $route.reload();
                // $location.path("/");
        }).catch(function(error){
            console.log(error);
        });
}
  }
}