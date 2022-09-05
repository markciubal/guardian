export default function average(nums) {
    nums.forEach(function(num, index) {
        nums[index] = Number(nums[index]);
        // console.log(nums[index]);
        // console.log(typeof nums[index]);
    })
    var averageReturn = nums.reduce((a, b) => a + b) / nums.length;
    
    return averageReturn;
}